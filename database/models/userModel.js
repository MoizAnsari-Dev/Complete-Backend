import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    mingLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    mingLength: 5,
    maxLength: 255,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    mingLength: 6,
  }
}, {
  timestamps: true,});

const User = mongoose.model('User', userSchema);

export default User;
