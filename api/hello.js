// Simple test API endpoint
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello World!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
