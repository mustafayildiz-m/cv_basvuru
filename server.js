const fs = require('fs');
const path = require('path');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync(path.resolve('certs/tfo.k12.tr.key')),
    cert: fs.readFileSync(path.resolve('certs/tfo.k12.tr.crt')),
};

app.prepare().then(() => {
    https
        .createServer(httpsOptions, (req, res) => {
            handle(req, res);
        })
        .listen(1587, (err) => {
            if (err) throw err;
        });
});
