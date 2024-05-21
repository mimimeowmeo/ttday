/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://ttday.vercel.app",
    NEXTAUTH_URL: "https://ttday.vercel.app",
    // API_URL: "http://localhost:3000",
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "KSDFJKLSDJFLZSDFJSX DKF934KJADJGDLKGFJDF",

    DB_LOCAL_URI: "mongodb://localhost:27017/ttday",
    DB_URI:
      "mongodb+srv://codinghistoryoflance:NDHXJ9XKQF1kkQI7@ttday.g6wckf8.mongodb.net/ttday?retryWrites=true&w=majority&appName=ttday",

    CLOUDINARY_CLOUD_NAME: "dewlvunhe",
    CLOUDINARY_API_KEY: "449448125551342",
    CLOUDINARY_API_SECRET: "LrKFc-tkv-NAerDtHr08xaWWJpk",

    NEXT_PUBLIC_MAP_API_KEY: "AIzaSyBauHo5yACE2iEIFPWQvBxwPl_PlAzmsG4",

    STRIPE_WEBHOOK_SECRET: "whsec_4sSPoe28Sj6GFHTRFgw8Qz0MZsOg28XV",
    // STRIPE_WEBHOOK_SECRET:
    //   "whsec_90f8174fbb371b8b328faec41c7bc21525ca8c3f10c7b5f6164bc079314ca653",
    STRIPE_SECRET_KEY:
      "sk_test_51PHjva08hNtoc4kZ9NKOpoZTYCTTMutt80d38shGtEm0raVZyqXPHUZkvtUR5TDX2lVZ6dkBBrkfN3WFxQirP7Ns008UgxOKse",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "ba286c85671db6",
    SMTP_PASSWORD: "96ef0bdf8ddfd4",
    SMTP_FROM_EMAIL: "noreply@ttday.com",
    SMTP_FROM_NAME: "TTday",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
