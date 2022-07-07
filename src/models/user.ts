import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  emailId: {
    type: 'string', 
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  phone: {
    type: 'string',
  },
});

const users = mongoose.model('registerUser', userSchema);
export default users;