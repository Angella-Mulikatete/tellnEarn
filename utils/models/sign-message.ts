import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  campaignId: {
    type: Number,
    required: true,
  },
  rewardAmount: {
    type: Number,
    required: true,
  },
  messageHash: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Prevent duplicate signature per user per campaign
signatureSchema.index({ userAddress: 1, campaignId: 1 }, { unique: true });

export default mongoose.models.Signature || mongoose.model('Signature', signatureSchema);