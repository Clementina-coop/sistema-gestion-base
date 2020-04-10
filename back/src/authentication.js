const { AuthenticationService, JWTStrategy } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");

class CustomAuthenticationService extends AuthenticationService {
  async getPayload(authResult, params) {
    const { user } = authResult
    let role = user.role
    return await { ...super.getPayload(authResult, params), role }
  }
}

module.exports = app => {
  const authentication = new CustomAuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};
