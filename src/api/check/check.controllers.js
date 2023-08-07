export const getCheck = (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now()
    };
    try {
        res.send(healthCheck);
    } catch ( error ) {
        healthCheck.message = error;
        res.status(503).send();
    }
};