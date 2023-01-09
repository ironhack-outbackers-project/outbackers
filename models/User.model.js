const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "images/default-avatar.png",
    },
    fullName: {
      type: String,
    },
    languages: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 122,
    },
    nationality: {
      type: String,
      default: "World Citizen",
    },
    about: {
      type: String,
      default: "Write something about you in 2-3 sentences.",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
