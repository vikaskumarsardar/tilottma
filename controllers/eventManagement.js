const { messages } = require("../messages/");
const { statusCodes } = require("../statusCodes/");
const { sendErrorResponse, sendResponse } = require("../lib/");
const {eventModel} = require('../models')

exports.createEvent = async (req, res) => {
  try {
    // const foundEvents = await eventModel
      // .aggregate([{ $match: { event: req.body.event } }])
      // .exec();
    // if (!foundEvents)
    //   return sendResponse(
    //     req,
    //     res,
    //     statusCodes.BAD_REQUEST,
    //     messages.EVENT_ALREADY_EXISTS
    //   );
    const newEvent = new eventModel(req.body);

    // const savedEvent = await newEvent.save();
    console.log(newEvent)
    sendResponse(req, res, statusCodes.CREATED, messages.CREATED, newEvent);
  } catch (err) {
    sendErrorResponse(
      req,
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};
exports.editEvent = async (req, res) => {
    
  try {
    const updatedEvent = await eventModel
      .updateOne({ event: req.body.event }, req.body, { new: true })
      .lean()
      .exec();
    if (!updatedEvent)
      return sendResponse(
        req,
        res,
        statusCodes.BAD_REQUEST,
        messages.EVENT_ALREADY_EXISTS
      );
    sendResponse(req, res, statusCodes.CREATED, messages.CREATED, updatedEvent);
  } catch (err) {
    sendErrorResponse(
      req,
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const updatedEvent = await eventModel
      .updateOne(
        { event: req.body.event, isDeleted: false },
        { isDeleted: true },
        { new: true }
      )
      .lean()
      .exec();
    if (!updatedEvent)
      return sendResponse(
        req,
        res,
        statusCodes.BAD_REQUEST,
        messages.EVENT_ALREADY_EXISTS
      );
    sendResponse(req, res, statusCodes.CREATED, messages.CREATED, updatedEvent);
  } catch (err) {
    sendErrorResponse(
      req,
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};



