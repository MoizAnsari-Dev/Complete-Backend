import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();
//Port
export const PORT = process.env.PORT || 3000;

//Rate Limiter
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
