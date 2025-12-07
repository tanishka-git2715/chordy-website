
import http from 'http';

const data = JSON.stringify({
    name: "Test User",
    email: "test-verified@example.com",
    category: "founder",
    categoryLabel: "Founder"
});

const req = http.request({
    hostname: 'localhost',
    port: 3002,
    path: '/api/waitlist',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
