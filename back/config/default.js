const config = {
  host: process.env.API_HOST,
  port: process.env.API_PORT,
  public: "../public/",
  paginate: {
    default: 10,
    max: 50
  },
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(','),
  maxSizePost: process.env.MAX_SIZE_POST,
  authentication: {
    entity: process.env.AUTH_ENTITY,
    service: process.env.AUTH_SERVICE,
    secret: process.env.AUTH_SECRET,
    authStrategies: [
      "jwt",
      "local"
    ],
    jwtOptions: {
      header: {
        typ: "access"
      },
      audience: process.env.AUTH_TOKEN_AUDIENCE,
      issuer: "feathers",
      algorithm: "HS256",
      expiresIn: process.env.AUTH_TOKEN_EXPIRATION
    },
    local: {
      usernameField: process.env.AUTH_USERNAME_FIELD,
      passwordField: process.env.AUTH_PASSWORD_FIELD
    }
  },
  mongodb: process.env.MONGO_DB,
  mongoOptions: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: process.env.MONGO_OPTIONS_AUTH_SOURCE
  },
};

module.exports = config;
