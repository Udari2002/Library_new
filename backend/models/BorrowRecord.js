import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, default: Date.now },
    dueAt: { type: Date, required: true },
    returnedAt: { type: Date } // set when returned
  },
  { timestamps: true }
);

// Virtuals
borrowRecordSchema.virtual("isOverdue").get(function () {
  return !this.returnedAt && this.dueAt < new Date();
});

export default mongoose.model("BorrowRecord", borrowRecordSchema);
