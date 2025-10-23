// Simple test API endpoint for Vercel
module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
};
