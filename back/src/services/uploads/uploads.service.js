// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/uploads',
    upload.single('file'),
    (req, _res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PATCH') {
        req.feathers.file = req.file;
      }
      next();
    },
    new Uploads(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
