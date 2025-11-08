import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true, index: true },
    returnDate: { type: Date },
    status: { type: String, enum: ["borrowed", "returned", "overdue"], default: "borrowed", index: true },
    fine: { type: Number, default: 0 },
    // optional snapshot of book details at borrow time
    snapshot: {
      title: String,
      isbn: String,
      authors: [String]
    }
  },
  { timestamps: true }
);

// Virtual for convenience
borrowRecordSchema.virtual("isOverdue").get(function () {
  return this.status === "borrowed" && this.dueDate < new Date();
});

// compound index to speed up user active borrows
borrowRecordSchema.index({ user: 1, status: 1, borrowDate: -1 });

export default mongoose.model("BorrowRecord", borrowRecordSchema);
