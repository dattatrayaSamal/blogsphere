import mongoose from "mongoose";

const refreshSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    replacedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RefreshSession",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// MongoDB removes expired sessions asynchronously.
// Authentication must still check expiresAt explicitly.
refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshSession = mongoose.model("RefreshSession", refreshSessionSchema);

export default RefreshSession;
