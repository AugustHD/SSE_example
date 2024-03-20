const http = require('http');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Send an initial comment to establish the connection
    res.write(': connection established\n\n');

    // Send messages at regular intervals
    const intervalId = setInterval(() => {
        const message = `data: ${new Date().toISOString()}\n\n`;
        res.write(message);
    }, 1000);

    // Close the connection after 10 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        res.end();
    }, 10000);

    // If the client closes the connection, stop sending messages
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
