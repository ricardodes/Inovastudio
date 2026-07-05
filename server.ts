import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { 
  seedDatabaseIfEmpty, 
  getCategories, 
  getProducts,
  getSettings,
  saveSettings,
  addProduct,
  deleteProduct,
  getMessages,
  addMessage,
  deleteMessage,
  updateMessageStatus,
  DEFAULT_CATEGORIES,
  DEFAULT_PRODUCTS
} from './src/lib/firebase-server';

async function startServer() {
  const app = express();
  
  // Custom Security Headers middleware to enforce platform safety and defend against common attacks
  app.use((_req, res, next) => {
    // Prevent MIME-sniffing attacks
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Prevent clickjacking by forbidding embedding this application in iframes of other domains
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // Set modern Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Prevent older browsers from executing reflected XSS
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Enforce HTTPS security if we are in production
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    // Prevent DNS prefetching to avoid passive leakage of external domains
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    next();
  });

  app.use(express.json({ limit: '10mb' })); // Limit JSON payloads to 10MB to protect memory buffer
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Lightweight, robust in-memory Rate Limiting Store
  interface RateLimitRecord {
    count: number;
    resetTime: number;
  }
  const rateLimitStore: Record<string, RateLimitRecord> = {};

  const createRateLimiter = (maxRequests: number, windowMs: number, message: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Resolve client IP cleanly, respecting reverse-proxies
      const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
      const now = Date.now();

      if (!rateLimitStore[ip]) {
        rateLimitStore[ip] = {
          count: 1,
          resetTime: now + windowMs
        };
        return next();
      }

      const record = rateLimitStore[ip];
      if (now > record.resetTime) {
        // Reset window if elapsed
        record.count = 1;
        record.resetTime = now + windowMs;
        return next();
      }

      record.count++;
      if (record.count > maxRequests) {
        return res.status(429).json({
          success: false,
          error: message
        });
      }
      next();
    };
  };

  // Enforce global rate limiter on all API endpoints (150 requests per minute per IP)
  const generalApiLimiter = createRateLimiter(
    150, 
    60 * 1000, 
    'Muitas requisições. Por favor, tente novamente em um minuto.'
  );
  app.use('/api', generalApiLimiter);

  // Enforce strict rate limiter on administrative logins and setups (500 requests per 10 minutes)
  const adminApiLimiter = createRateLimiter(
    500, 
    10 * 60 * 1000, 
    'Acesso administrativo bloqueado temporariamente por excesso de tentativas. Tente novamente em 10 minutos.'
  );

  // Enforce rate limiter on contact forms to block automated spam bots (5 messages per 5 minutes)
  const messageSubmissionLimiter = createRateLimiter(
    5, 
    5 * 60 * 1000, 
    'Você enviou muitas mensagens recentemente. Aguarde 5 minutos antes de enviar novamente.'
  );

  // Helper to sanitize customer strings (preventing Stored/Reflected XSS attacks)
  const sanitizeInput = (val: any, maxLength = 1000): string => {
    if (typeof val !== 'string') return '';
    return val
      .trim()
      .substring(0, maxLength)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  // Seed the Firestore database on startup
  try {
    await seedDatabaseIfEmpty();
  } catch (err) {
    console.error('Falha ao rodar o seeder do Firebase:', err);
  }

  // API Health check route
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'InovaStudio API' });
  });

  // API Route to fetch categories dynamically from Firestore
  app.get('/api/categories', async (_req, res) => {
    try {
      const categories = await getCategories();
      if (categories && categories.length > 0) {
        res.json({ success: true, categories });
      } else {
        // Fallback to default categories if Firestore fetch failed or is empty
        res.json({ success: true, categories: DEFAULT_CATEGORIES });
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.json({ success: true, categories: DEFAULT_CATEGORIES });
    }
  });

  // API Route to fetch products dynamically from Firestore
  app.get('/api/products', async (_req, res) => {
    try {
      const products = await getProducts();
      if (products && products.length > 0) {
        res.json({ success: true, products });
      } else {
        res.json({ success: true, products: DEFAULT_PRODUCTS });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      res.json({ success: true, products: DEFAULT_PRODUCTS });
    }
  });

  // Administrative security middleware
  const adminAuthMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const authHeader = req.headers['x-admin-password'] || req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ success: false, error: 'Acesso negado. Senha administrativa não fornecida.' });
      }
      const settings = await getSettings();
      const currentPassword = settings?.adminPassword || 'admin123';
      const providedPassword = typeof authHeader === 'string'
        ? authHeader.replace(/^Bearer\s+/, '')
        : '';
      if (providedPassword !== currentPassword) {
        return res.status(403).json({ success: false, error: 'Não autorizado. Senha de administração incorreta.' });
      }
      next();
    } catch (err) {
      console.error('Erro no middleware de autenticação admin:', err);
      res.status(500).json({ success: false, error: 'Erro interno de segurança.' });
    }
  };

  // API Route to get general settings
  app.get('/api/settings', async (req, res) => {
    try {
      const settings = await getSettings();
      if (!settings) {
        return res.json({ success: true, settings: null });
      }

      // Check if authorized admin password is provided in headers to prevent leaking it publicly
      const authHeader = req.headers['x-admin-password'] || req.headers['authorization'];
      const currentPassword = settings.adminPassword || 'admin123';
      const providedPassword = typeof authHeader === 'string'
        ? authHeader.replace(/^Bearer\s+/, '')
        : '';

      if (providedPassword === currentPassword) {
        // Authenticated admin: return everything including password
        res.json({ success: true, settings });
      } else {
        // Public guest: mask or remove adminPassword for industry-grade security
        const { adminPassword, ...publicSettings } = settings;
        res.json({ success: true, settings: publicSettings });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      res.status(500).json({ success: false, error: 'Falha ao buscar configurações' });
    }
  });

  // API Route to securely verify admin password without leaking it to the client-side
  app.post('/api/verify-password', adminApiLimiter, async (req, res) => {
    try {
      const { password } = req.body;
      const settings = await getSettings();
      const correctPassword = settings?.adminPassword || 'admin123';
      if (password === correctPassword) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, error: 'Senha incorreta' });
      }
    } catch (err) {
      console.error('Error verifying password:', err);
      res.status(500).json({ success: false, error: 'Erro de processamento interno' });
    }
  });

  // API Route to save settings
  app.post('/api/settings', adminApiLimiter, adminAuthMiddleware, async (req, res) => {
    try {
      const settings = req.body;
      if (!settings || !settings.storeName) {
        return res.status(400).json({ success: false, error: 'Configurações inválidas' });
      }
      
      // Sanitize settings text inputs for additional layer of security
      const sanitizedSettings = {
        ...settings,
        storeName: sanitizeInput(settings.storeName, 100),
        storeDescription: sanitizeInput(settings.storeDescription, 500),
        shopeeStoreUrl: sanitizeInput(settings.shopeeStoreUrl, 300),
        whatsAppPhone: sanitizeInput(settings.whatsAppPhone, 30),
        whatsAppMessage: sanitizeInput(settings.whatsAppMessage, 500),
        socialInstagram: sanitizeInput(settings.socialInstagram, 100),
        socialFacebook: sanitizeInput(settings.socialFacebook, 200),
        socialYoutube: sanitizeInput(settings.socialYoutube, 200),
        socialTelegram: sanitizeInput(settings.socialTelegram, 200),
        wholesaleWhatsApp: sanitizeInput(settings.wholesaleWhatsApp, 30),
        wholesaleTelegram: sanitizeInput(settings.wholesaleTelegram, 200),
        logoUrl: typeof settings.logoUrl === 'string' && settings.logoUrl.trim().startsWith('data:image/')
          ? (settings.logoUrl.trim().length < 8 * 1024 * 1024 && /^data:image\/[a-zA-Z+.-]+;base64,/.test(settings.logoUrl.trim()) ? settings.logoUrl.trim() : '')
          : sanitizeInput(settings.logoUrl, 500),
        contactEmail: sanitizeInput(settings.contactEmail, 150)
      };

      await saveSettings(sanitizedSettings);
      res.json({ success: true, message: 'Configurações salvas com sucesso' });
    } catch (err) {
      console.error('Error saving settings:', err);
      res.status(500).json({ success: false, error: 'Falha ao salvar configurações' });
    }
  });

  // API Route to add/update a product
  app.post('/api/products', adminApiLimiter, adminAuthMiddleware, async (req, res) => {
    try {
      const product = req.body;
      if (!product || !product.id || !product.name) {
        return res.status(400).json({ success: false, error: 'Dados do produto inválidos' });
      }

      // Sanitize product string fields
      const sanitizedProduct = {
        ...product,
        name: sanitizeInput(product.name, 150),
        description: sanitizeInput(product.description, 1500),
        priceFormatted: sanitizeInput(product.priceFormatted, 50),
        image: sanitizeInput(product.image, 500),
        badge: sanitizeInput(product.badge, 50),
        shopeeUrl: sanitizeInput(product.shopeeUrl, 500),
        categoryId: sanitizeInput(product.categoryId, 80),
        categoryLabel: sanitizeInput(product.categoryLabel, 100)
      };

      await addProduct(sanitizedProduct);
      res.json({ success: true, message: 'Produto salvo com sucesso', product: sanitizedProduct });
    } catch (err) {
      console.error('Error saving product:', err);
      res.status(500).json({ success: false, error: 'Falha ao salvar produto' });
    }
  });

  // API Route to delete a product
  app.delete('/api/products/:id', adminApiLimiter, adminAuthMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'ID de produto inválido' });
      }
      await deleteProduct(id);
      res.json({ success: true, message: 'Produto removido com sucesso' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ success: false, error: 'Falha ao remover produto' });
    }
  });

  // API Routes for Messages (Fale Conosco)
  app.get('/api/messages', adminAuthMiddleware, async (_req, res) => {
    try {
      const messages = await getMessages();
      res.json({ success: true, messages });
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ success: false, error: 'Falha ao buscar mensagens' });
    }
  });

  app.post('/api/messages', messageSubmissionLimiter, async (req, res) => {
    try {
      const { name, email, phone, messageText } = req.body;
      if (!name || !email || !messageText) {
        return res.status(400).json({ success: false, error: 'Nome, email e mensagem são obrigatórios' });
      }

      // Strong sanitization on customer entries to guarantee database protection
      const cleanName = sanitizeInput(name, 100);
      const cleanEmail = sanitizeInput(email, 150);
      const cleanPhone = sanitizeInput(phone, 30);
      const cleanMessageText = sanitizeInput(messageText, 2000);

      await addMessage({ 
        name: cleanName, 
        email: cleanEmail, 
        phone: cleanPhone || "", 
        messageText: cleanMessageText 
      });
      
      res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ success: false, error: 'Falha ao enviar mensagem' });
    }
  });

  app.patch('/api/messages/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      await updateMessageStatus(id, updates);
      res.json({ success: true, message: 'Mensagem atualizada com sucesso!' });
    } catch (err) {
      console.error('Error updating message status:', err);
      res.status(500).json({ success: false, error: 'Falha ao atualizar mensagem' });
    }
  });

  app.delete('/api/messages/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await deleteMessage(id);
      res.json({ success: true, message: 'Mensagem excluída com sucesso!' });
    } catch (err) {
      console.error('Error deleting message:', err);
      res.status(500).json({ success: false, error: 'Falha ao excluir mensagem' });
    }
  });

  // Serve static assets or use Vite in dev mode
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[InovaStudio Server] rodando em http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Falha ao iniciar o servidor:', err);
});
