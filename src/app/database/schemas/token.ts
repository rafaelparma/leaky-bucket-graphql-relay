import { Document, model, Schema } from 'mongoose';
import { EnumPixKeyType } from './pixkey'

interface IToken extends Document {  
  token: string;  
  username: string;  
  pixkey_type: EnumPixKeyType;
  pixkey: string;
  pixkey_valid: boolean;
  used: boolean;
  expired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true
  }, 
  pixkey_type: { 
    type: String,
    required: false
  },            
  pixkey: { 
    type: String, 
    required: false
  },     
  used: { 
    type: Boolean, 
    default: false,
    required: false     
  }, 
  pixkey_valid: { 
    type: Boolean, 
    default: false,
    required: false     
  },  
  expired: { 
    type: Boolean, 
    default: false,
    required: false     
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

TokenSchema.index({ username: 1 });
TokenSchema.index({ createdAt: 1, used: 1, expired: 1 });

const TokenModel = model<IToken>('Token', TokenSchema);

export { IToken, TokenModel };