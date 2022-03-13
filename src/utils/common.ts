export const loggerMiddleware = (req, res, next) => {
  const currentDate = new Date();
  console.log(`${req.method} ${req.path} - ${currentDate}`);
  next();
};
