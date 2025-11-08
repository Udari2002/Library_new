import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    // category can be a string or a ref to Category if you add that model later
    category: { type: String, default: "General" },
    isbn: { type: String, unique: true, sparse: true },
    // inventory counts
    totalCopies: { type: Number, default: 1 },
    copiesAvailable: { type: Number, default: 1 },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    coverImage: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// text index for search
bookSchema.index({ title: "text", description: "text" });

export default mongoose.model("Book", bookSchema);
