import { model, Schema } from "mongoose";
import { IBlacklistToken } from "../types/blacklistToken.type";

const BlackListTokenSchema = new Schema<IBlacklistToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

export const BlackListTokenModel = model(
  "BlackListToken",
  BlackListTokenSchema
);
