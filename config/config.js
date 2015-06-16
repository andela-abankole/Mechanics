module.exports = {
  'database': process.env.MONGO_DEV || process.env.MONGO_PROD,
  'secret': process.env.JWT_DEV || process.env.JWT_PROD,
  'cloudinary': process.env.CLOUDINARY_URL 
}