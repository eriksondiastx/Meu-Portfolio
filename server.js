const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const i18nFile = path.join(__dirname, 'i18n-store.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Fallback case-insensitive para ficheiros estáticos (garante imagens no Linux)
app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const decodedPath = decodeURIComponent(req.path);
    const relativePath = decodedPath.replace(/^\/+/, '');
    if (!relativePath) return next();
    const fullPath = path.join(__dirname, relativePath);
    if (fs.existsSync(fullPath)) return next();

    const segments = relativePath.split(/[/\\]+/).filter(Boolean);
    let currentDir = __dirname;
    let found = true;
    for (const segment of segments) {
        try {
            const files = fs.readdirSync(currentDir);
            const matched = files.find(f => f.toLowerCase() === segment.toLowerCase());
            if (!matched) {
                found = false;
                break;
            }
            currentDir = path.join(currentDir, matched);
        } catch {
            found = false;
            break;
        }
    }
    if (found && fs.existsSync(currentDir) && fs.statSync(currentDir).isFile()) {
        return res.sendFile(currentDir);
    }
    next();
});

// i18n - obter dicionário do servidor
app.get('/api/i18n', (_req, res) => {
    try {
        const raw = fs.readFileSync(i18nFile, 'utf8');
        const data = JSON.parse(raw);
        return res.json(data && typeof data === 'object' ? data : { pt: {}, en: {} });
    } catch {
        return res.json({ pt: {}, en: {} });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado: http://0.0.0.0:${PORT}`);
});
