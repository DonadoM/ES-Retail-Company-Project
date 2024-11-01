import mongoose, { Document, Schema } from 'mongoose';

export interface IAuth extends Document {
  userId: string; // ID del usuario autenticado
  token: string;   // Token JWT
  createdAt: Date; // Fecha de creación del token
  expiresAt: Date; // Fecha de expiración del token
}

const authSchema: Schema<IAuth> = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' }, // El token expira en 30 días
  expiresAt: { type: Date, required: true },
});

// Middleware para establecer la fecha de expiración del token
authSchema.pre<IAuth>('save', function (next) {
  if (!this.isModified('token')) {
    return next();
  }
  this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días
  next();
});

const Auth = mongoose.model<IAuth>('Auth', authSchema);

export default Auth;
