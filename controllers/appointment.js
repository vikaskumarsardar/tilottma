const { sendResponse, sendErrorResponse } = require("../lib");
const { messages } = require("../messages");
const { statusCodes } = require("../statusCodes");
const { constants } = require("../constants");
const { appointmentModel } = require("../models");
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new appointmentModel(req.body);
    const savedAppointment = await newAppointment.save();
    sendResponse(
      req,
      res,
      statusCodes.CREATED,
      messages.CREATED,
      savedAppointment
    );
  } catch (err) {
    console.log(err);
    sendErrorResponse(
      req,
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};
exports.getAppointments = async (req, res) => {
  try {
    let { pageNo, limit, search, month, firstDate, lastDate, year, week } =
      req.body;
    limit = limit || constants.limit;
    search = search || "";
    firstDate = firstDate || 1;
    month = month || new Date().getMonth() + 1;
    lastDate = constants.months[month];
    year = year || new Date().getFullYear();
    const skip = Math.max(0, (parseInt(pageNo) || 1) - 1) * limit;
    const query = {};
    query.$or = [
      {
        date: {
          $gte: new Date(`${year}-${month}-${firstDate}`),
          $lte: new Date(`${year}-${month}-${lastDate}`),
        },
      },
    ];

    const foundAppointments = await appointmentModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    if (foundAppointments.length === 0)
      return sendResponse(
        req,
        res,
        statusCodes.BAD_REQUEST,
        messages.NO_APPOINTMENT_FOUND
      );
    sendResponse(req, res, statusCodes.OK, messages.SUCCESS, foundAppointments);
  } catch (err) {
    console.log(err);
    sendErrorResponse(
      req,
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};
