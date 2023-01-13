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
    country: String,
    city: String,
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
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
      username: String
      }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recom", recommendationSchema);
