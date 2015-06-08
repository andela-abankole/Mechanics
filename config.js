module.exports = {

  'secret': process.env.JWT_DEV || process.env.JWT_PROD,
  'database': process.env.MONGO_DEV || process.env.MONGO_PROD,

}