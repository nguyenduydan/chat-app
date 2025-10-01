//todo
import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT || 3000,
    APP_URI: process.env.APP_URI,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RESEND_API_CLIENT: process.env.RESEND_API_CLIENT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL
};
