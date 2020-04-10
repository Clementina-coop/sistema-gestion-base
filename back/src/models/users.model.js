// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    role: {
      type: Schema.ObjectId,
      ref: "roles",
      required: true
    },
    password: { type: String, required: true },
    image: {
      type: Schema.ObjectId,
      ref: 'uploads'
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('users');
  } catch (e) {
    return mongooseClient.model('users', users);
  }
};
