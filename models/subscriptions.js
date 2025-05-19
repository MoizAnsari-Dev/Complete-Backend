import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'INR'], // Add more currencies as needed
    default: 'INR',
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    enum: ['daily', 'weekly', 'monthly', 'yearly'], // Add more frequencies as needed
    default: 'monthly',
  },
  catagory: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['basic', 'premium', 'enterprise'], // Add more categories as needed
    default: 'basic',
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['active', 'inactive', 'expired'], // Add more statuses as needed
    default: 'active',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function (v) {
        return v <= new Date();
      },
      message: (props) => `${props.value} is not a valid start date!`,
    },
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return v > this.startDate;
      },
      message: (props) => `${props.value} must be after the start date!`,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
}, {
  timestamps: true,
});
// Create a compound index on user and status
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
