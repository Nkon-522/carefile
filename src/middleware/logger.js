import { logger } from '../log/log.js';

export const logRequest = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};