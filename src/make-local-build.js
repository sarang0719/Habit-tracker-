
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const OUT_PATH = path.join(DIST_DIR, 'index_local.html');

try {
    let html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

    // Handle CSS
    // Look for <link rel="stylesheet" crossorigin href="./assets/style.css"> or similar
    // Regex to find the link tag and capture the href
    const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="\.?\/assets\/([^"]+)"[^>]*>/g;

    html = html.replace(cssRegex, (match, fileName) => {
        console.log(`Inlining CSS: ${fileName}`);
        const cssPath = path.join(DIST_DIR, 'assets', fileName);
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf-8');
            return `<style>\n${cssContent}\n</style>`;
        }
        return match;
    });

    // Handle JS
    // Look for <script type="module" crossorigin src="./assets/index.js"></script>
    const jsRegex = /<script[^>]*src="\.?\/assets\/([^"]+)"[^>]*><\/script>/g;

    html = html.replace(jsRegex, (match, fileName) => {
        console.log(`Inlining JS: ${fileName}`);
        const jsPath = path.join(DIST_DIR, 'assets', fileName);
        if (fs.existsSync(jsPath)) {
            let jsContent = fs.readFileSync(jsPath, 'utf-8');
            // Simple escaping for safety
            return `<script type="module">\n${jsContent}\n</script>`;
        }
        return match;
    });

    fs.writeFileSync(OUT_PATH, html);
    console.log(`Success! Created single-file build at: ${OUT_PATH}`);

} catch (e) {
    console.error("Error inlining assets:", e);
}
