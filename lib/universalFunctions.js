const { messages } = require("../messages/");
const { statusCodes } = require("../statusCodes/");
exports.sendResponse = (req, res, code, message, data) => {
  try {
    code = code || statusCodes.OK;
    message = message || messages.OK;
    data = data || {};
    res.status(code).send({
      statusCode: code,
      message: message,
      data: data,
    });
  } catch (err) {
    throw err;
  }
};
exports.sendErrorResponse = (req, res, code, error, message) => {
  try {
    code = code || statusCodes.BAD_REQUEST;
    error = error || messages.BAD_REQUEST;
    res.status(code).send({
      statusCode: code,
      error: error,
      message: message,
    });
  } catch (err) {
    throw err;
  }
};
