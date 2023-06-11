import rateLimit from 'express-rate-limit';


export const defaultRateLimiter = rateLimit({
    windowMs: 10000, // 10 seconds
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});

export const addQuestionRateLimiter = rateLimit({
    windowMs: 5 * 60000, // 5 minutes
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});

export const voteQuestionRateLimiter = rateLimit({
    windowMs: 10000, // 10 seconds
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});
