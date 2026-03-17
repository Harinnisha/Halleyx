const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Customer Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },

  // Order Information
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
  unitPrice: { type: Number, required: true },
  totalAmount: { type: Number },
  status: { 
    type: String, 
    enum: ['Pending', 'In progress', 'Completed'], 
    default: 'Pending' 
  },
  createdBy: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Auto-calculate totalAmount before saving
orderSchema.pre('save', function () {
  if (this.quantity && this.unitPrice) {
    this.totalAmount = this.quantity * this.unitPrice;
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
