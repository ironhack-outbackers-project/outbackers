const { Schema, model, default: mongoose } = require("mongoose");

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
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [{
      message: String,
      creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recom", recommendationSchema);
