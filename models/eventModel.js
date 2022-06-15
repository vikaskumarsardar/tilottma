const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      eventTitle: {
        type: String,
        default: "",
      },
      eventType: {
        type: String,
        default: "private",
      },
      eventBanner: {
        type: String,
        default: "",
      },
    },
    hostInfo: {
      email: {
        type: String,
        default: "",
      },
      mobileNo: {
        type: String,
        default: "",
      },
      alternateMobile: {
        type: String,
        default: "",
      },
    },
    venue: {
      startDateAndTime: {
        type: Date,
      },
      endDateAndTime: {
        type: Date,
      },
      location: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: { type: String, default: "" },
      ZIP: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
