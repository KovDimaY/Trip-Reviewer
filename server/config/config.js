const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: 'DEVELOPMENT_SECRET',
    DATABASE: 'mongodb://localhost:27017/tripReviewer',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
