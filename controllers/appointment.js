const { sendResponse, sendErrorResponse } = require("../lib");
const { messages } = require("../messages");
const { statusCodes } = require("../statusCodes");
const { constants } = require("../constants");
const { appointmentModel } = require("../models");
exports.createAppointment = async (req, res) => {
  try {
    const foundAppointments = await appointmentModel
      .find({
        appointment: req.body.appointment,
        date: new Date(req.body.date),
      })
      .lean()
      .exec();
    if (foundAppointments.length > 0)
      return sendResponse(req, res, statusCodes.BAD_REQUEST, messages.APPOINTMENT_ALREADY_EXISTS);

    const newAppointment = new appointmentModel(req.body);
    const savedAppointment = await newAppointment.save();
    sendResponse(req, res, statusCodes.CREATED, messages.CREATED, {
      appointment: savedAppointment.appointment,
      date: savedAppointment.date,
      _id: savedAppointment.__id,
    });
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
    let { pageNo, search, limit, filterBy, date } = req.body;
    date = new Date(date) || new Date();
    limit = limit || 10;
    year = date.getFullYear();
    let firstDate;
    let lastDate;
    month = date.getMonth() + 1;
    search = search || "";
    filterBy === "week"
      ? ((firstDate = new Date(
          date.getTime() - 7 * 1000 * 60 * 60 * 24
        ).getDate()),
        (lastDate = date.getDate()))
      : filterBy === "specificDate"
      ? ((firstDate = date.getDate()),
        (lastDate = constants.months[date.getMonth() + 1]))
      : ((firstDate = 1), (lastDate = constants.months[date.getMonth() + 1]));
    const skip = Math.max(0, (parseInt(pageNo) || 1) - 1) * limit;
    const query = { isCanceled: false };
    query.$and = [
      {
        date: {
          $gte: new Date(`${year}-${month}-${firstDate}`),
          $lte: new Date(`${year}-${month}-${lastDate}`),
        },
      },
      {
        appointment: { $regex: search, $options: "$i" },
      },
    ];
    const appointmentCount = await appointmentModel.countDocuments(query).exec()    
    const pageCount = Math.ceil(appointmentCount / limit)
    
    const foundAppointments = await appointmentModel
      .find(query, { isCanceled: 0, __v: 0, createdAt: 0, updatedAt: 0 })
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
          {
            appointmentCount,
            pageCount,
            appointments : foundAppointments
          }

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
