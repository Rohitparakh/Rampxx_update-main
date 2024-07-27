import { Schema, model, models, Document } from "mongoose";

export interface IRegistry extends Document {
  address: string;
  registeredAt: Date;
}

const RegistrySchema = new Schema({
  address: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

const Registry = models.Registry || model("Registry", RegistrySchema);

export default Registry;
