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
  skip: (req: Request, key?: string) => {
    console.log(req)
    console.log(key)

    const { url } = req;
    if (url === "/graphql") {
      return false; // Skip rate limiting for this endpoint
    }
    return true; // Apply rate limiting for all other requests
  },
};

export const CORSConfig = {
  origin: process.env.CORS_ORIGIN!,
};
