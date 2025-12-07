import http from 'node:http';
import handler from './api/waitlist.js';

const PORT = 3002;

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    // Helper for JSON response
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
    };

    console.log(`${req.method} ${req.url}`);

    if (req.url === '/api/waitlist') {
        try {
            // Parse body
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const bodyStr = Buffer.concat(buffers).toString();

            try {
                req.body = bodyStr ? JSON.parse(bodyStr) : {};
            } catch (e) {
                console.warn('Failed to parse body as JSON:', e.message);
                req.body = bodyStr; // Pass as string to let handler deal with it (it has checks now)
            }

            await handler(req, res);
        } catch (e) {
            console.error('Server shim error:', e);
            if (!res.writableEnded) {
                res.status(500).json({ error: 'Shim Error', details: e.message });
            }
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Test API server running at http://localhost:${PORT}`);
});
