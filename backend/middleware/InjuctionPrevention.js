import xss from "xss"; // if you're using ES modules
// const xss = require('xss');  // if using CommonJS

// Middleware: NoSQL Injection Sanitizer
export const sanitizeRequest = (req, res, next) => {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (/^\$/.test(key)) {
        delete obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
};

// Middleware: XSS Sanitizer
export const sanitizeXSS = (req, res, next) => {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = xss(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
};
