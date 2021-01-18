import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const merchantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    businessName: {
      type: String,
      required: true
    },
    businessAddress: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: String,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

merchantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

merchantSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
