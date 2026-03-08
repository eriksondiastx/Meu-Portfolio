const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, 'imagem', 'uploads');
const logDir = path.join(__dirname, 'logs');
const auditLogFile = path.join(logDir, 'audit.log');
const i18nFile = path.join(__dirname, 'i18n-store.json');
const translateUrl = process.env.TRANSLATE_URL || 'https://libretranslate.com/translate';
const translateApiKey = process.env.TRANSLATE_API_KEY || '';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const random = Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        const safeName = file.originalname
            .replace(ext, '')
            .toLowerCase()
            .replace(/[^a-z0-9-_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        cb(null, `${safeName || 'upload'}-${timestamp}-${random}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// CODEX: Leitura/escrita simples do dicionário i18n no servidor
function readI18nStore() {
    try {
        const raw = fs.readFileSync(i18nFile, 'utf8');
        const data = JSON.parse(raw);
        return data && typeof data === 'object' ? data : { pt: {}, en: {} };
    } catch {
        return { pt: {}, en: {} };
    }
}

function writeI18nStore(data) {
    fs.writeFileSync(i18nFile, JSON.stringify(data, null, 2), 'utf8');
}

function slugifyText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 60) || 'texto';
}

async function translateText(text, source, target) {
    try {
        const response = await fetch(translateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                source,
                target,
                format: 'text',
                api_key: translateApiKey || undefined
            })
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.translatedText || null;
    } catch {
        return null;
    }
}

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum ficheiro enviado.' });
    }
    const relativePath = `/imagem/uploads/${req.file.filename}`;
    const payload = {
        url: relativePath,
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
    };
    // CODEX: Log de auditoria (upload)
    logAudit({ action: 'upload', entity: 'file', payload });
    return res.json(payload);
});

// CODEX: Remoção segura de ficheiros enviados
app.post('/api/delete', (req, res) => {
    const { url } = req.body || {};
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL inválida.' });
    }

    const normalizedUrl = url.split('?')[0];
    if (!normalizedUrl.startsWith('/imagem/uploads/')) {
        return res.status(400).json({ error: 'Caminho não permitido.' });
    }

    const filename = path.basename(normalizedUrl);
    const filePath = path.join(uploadDir, filename);
    const resolved = path.resolve(filePath);

    if (!resolved.startsWith(path.resolve(uploadDir))) {
        return res.status(400).json({ error: 'Caminho inválido.' });
    }

    fs.unlink(resolved, (err) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Falha ao remover ficheiro.' });
        }
        // CODEX: Log de auditoria (delete)
        logAudit({ action: 'delete', entity: 'file', payload: { url: normalizedUrl } });
        return res.json({ ok: true });
    });
});

// CODEX: i18n - obter dicionário do servidor
app.get('/api/i18n', (req, res) => {
    return res.json(readI18nStore());
});

// CODEX: i18n - salvar texto e gerar chave global
app.post('/api/i18n/save', async (req, res) => {
    const { lang, text, autoTranslate, forceKey } = req.body || {};
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Texto inválido.' });
    }
    const targetLang = lang === 'en' ? 'en' : 'pt';
    const store = readI18nStore();
    store.pt = store.pt || {};
    store.en = store.en || {};

    let key = null;
    if (forceKey && typeof forceKey === 'string') {
        key = forceKey;
    } else {
        const baseKey = slugifyText(text);
        key = baseKey;
        let counter = 2;
        while (store.pt[key] || store.en[key]) {
            key = `${baseKey}_${counter}`;
            counter += 1;
        }
    }

    store[targetLang][key] = text;
    if (autoTranslate && targetLang === 'pt') {
        const translated = await translateText(text, 'pt', 'en');
        if (translated && !store.en[key]) {
            store.en[key] = translated;
            logAudit({ action: 'add', entity: 'i18n', payload: { key, lang: 'en', auto: true } });
        }
    }

    writeI18nStore(store);

    logAudit({ action: 'add', entity: 'i18n', payload: { key, lang: targetLang, auto: Boolean(autoTranslate) } });
    return res.json({ key, autoTranslated: Boolean(autoTranslate) });
});

// CODEX: Auditoria de ações do painel (add/edit/delete)
app.post('/api/audit', (req, res) => {
    const { action, entity, payload } = req.body || {};
    if (!action || !entity) {
        return res.status(400).json({ error: 'Dados inválidos.' });
    }
    logAudit({ action, entity, payload: payload || {} });
    return res.json({ ok: true });
});

// CODEX: Histórico de auditoria
app.get('/api/audit/history', (req, res) => {
    const limit = Math.max(1, Math.min(500, Number(req.query.limit) || 100));
    fs.readFile(auditLogFile, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Falha ao ler histórico.' });
        }
        const lines = (data || '').trim().split('\n').filter(Boolean);
        const recent = lines.slice(-limit).map(line => {
            try {
                return JSON.parse(line);
            } catch {
                return null;
            }
        }).filter(Boolean);
        return res.json({ items: recent });
    });
});

function logAudit(entry) {
    const record = {
        ts: new Date().toISOString(),
        ...entry
    };
    const line = JSON.stringify(record);
    console.log('[AUDIT]', record.ts, record.action, record.entity, JSON.stringify(record.payload || {}));
    fs.appendFile(auditLogFile, `${line}\n`, () => {});
}

app.listen(PORT, () => {
    console.log(`Servidor iniciado: http://localhost:${PORT}`);
});
