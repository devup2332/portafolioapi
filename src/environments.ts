import dotenv from "dotenv";

dotenv.config();

export const environments = {
  DB: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
  },
  PORT: process.env.PORT || 8000,
  JWT: {
    SECRET_KEY: process.env.SECRET_KEY as string,
  },
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  NODEMAILER: {
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,

  },
};
