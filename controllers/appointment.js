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
    let { pageNo, limit, search, month, firstDate,date,lastDate, year, week } =
      req.body;
    // limit = limit
    // || constants.limit;
    year = year || new Date().getFullYear();
    month = month || new Date().getMonth() + 1;
    search = search || "";
    const newDate = new Date(date)
    filterBy === "week" ?
    (firstDate = new Date(new Date(date).getTime() - (7 * 1000 * 60 * 60 * 24 )),lastDate = new Date(date).getDate()) : filterBy === "month" ? (firstDate = 1 ,lastDate = constants.months[newDate.getMonth()]): filterBy === "specificDate" ? (firstDate = newDate.getDate(),lastDate = constants.months[month]) : "";
      // firstDate = firstDate || 1)
    console.log(lastDate, month);
    const skip = Math.max(0, (parseInt(pageNo) || 1) - 1) * limit;
    const query = { isCanceled: false };
    query.$or = [
      {
        date: {
          $gte: new Date(`${year}-${month}-${firstDate}`),
          $lte: new Date(`${year}-${month}-${lastDate}`),
        },
      },
      {
        appointment : {$regex : search,$options : "$i"}
      }
    ];
    const foundAppointments = await appointmentModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    return foundAppointments.length === 0
      ? sendResponse(
          req,
          res,
          statusCodes.BAD_REQUEST,
          messages.NO_APPOINTMENT_FOUND
        )
      : sendResponse(
          req,
          res,
          statusCodes.OK,
          messages.SUCCESS,
          foundAppointments
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
