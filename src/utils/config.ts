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
  max: 100,
};

export const CORSConfig = {
  origin: /.*\.saltyaom\.com$/,
};
