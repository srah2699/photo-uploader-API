import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({ 
  userId: {
    type: 'string',
    required: true
  },
  desc: {
    type: 'string',
  },
  image: {
    type: 'string',
    required: true
  }

})

const uploadData = mongoose.model('uploads', uploadSchema);
export default uploadData;