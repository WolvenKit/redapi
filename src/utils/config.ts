export const swaggerConfig = {
  documentation: {
    info: {
      title: "REDmodding API",
      version: "3.0.0",
    },
  },
};

export const rateLimitConfig = {
  duration: 60,
  max: 110,
};

export const CORSConfig = {
  origin: process.env.CORS_ORIGIN!,
};
