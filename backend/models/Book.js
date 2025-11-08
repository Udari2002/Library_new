import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    isbn: { type: String, unique: true, sparse: true },
    available: { type: Boolean, default: true },
    coverImage: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
