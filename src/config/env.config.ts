import { config } from 'dotenv';
config();
export const envConfig = {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
}