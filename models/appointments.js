const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    appointment: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: new Date(Date.now() + 4 * 1000 * 60 * 60),
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;
