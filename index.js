const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const API_TARGET = process.env.API_TARGET || 'https://sebenza-server.onrender.com';

// Proxy API requests to backend
app.use('/api', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: { '^/api': '/api' },
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sebenza frontend running on port ${PORT}`);
  console.log(`API proxy target: ${API_TARGET}`);
});
