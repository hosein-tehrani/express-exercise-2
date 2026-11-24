const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minLength: 2 },
    text: { type: String, required: true, trim: true, minLength: 2 },
    show: { type: Boolean, default: false },
    bookmarks: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
const blogModel = model("blog", blogSchema);
module.exports = {
  blogModel,
};
