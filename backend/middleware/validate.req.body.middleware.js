// backend/middlewares/validateReqBody.js

const validateReqBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors || ["Invalid request body"],
      });
    }
  };
};

export default validateReqBody;
