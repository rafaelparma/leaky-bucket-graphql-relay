import { Document, model, Schema } from 'mongoose';

enum EnumPixKeyType {
  CPF = "CPF",
  CNPJ = "CNPJ",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  EVP = "EVP",
}
interface IPixKey extends Document {
  pixkey_type: EnumPixKeyType;
  pixkey: string;  
  createdAt: Date;
  updatedAt: Date;
}

const PixKeySchema: Schema = new Schema({
  pixkey_type: { 
    type: String, 
    required: true, 
    unique: false 
  },
  pixkey: { 
    type: String, 
    required: true, 
    unique: true 
  },       
  createdAt: { 
    type: Date, 
    default: Date.now, 
    required: false 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now, 
    required: false 
  },    
}, {
  timestamps: true
});

PixKeySchema.index({ pixkey_type: 1, pixkey: 1 });  

const PixKeyModel = model<IPixKey>('PixKey', PixKeySchema);

export { EnumPixKeyType, IPixKey, PixKeyModel };