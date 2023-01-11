const { Schema, model } = require("mongoose");

const recommendationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    advice: {
      type: String,
    },
    country: String,
    city: String,
    image: {
      type: String,
      default: "../public/images/default-img.png",
    },
    creator: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recom", recommendationSchema);
