const mongoose = require('mongoose');

/**
 * Schema for the accommodation requests that the homeless youth make.
 */
const requestSchema = new mongoose.Schema({
  // Youth's first name
  firstName: {
    type: String,
    required: true,
  },
  // Youth's last name
  lastName: {
    type: String,
    required: true,
  },
  // Gender
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Unspecified'],
  },
  // Age
  age: {
    type: Number,
    required: true,
  },
  // Phone Number
  phoneNumber: {
    type: String,
    required: true,
  },
  // Does the youth have a disability
  hasDisability: {
    type: Boolean,
    required: true,
  },
  // Child
  hasChild: {
    type: Boolean,
    required: true,
  },
  // True if requesting long term accommodation, false otherwise
  isLongTerm: {
    type: Boolean,
    required: true,
  },
  // Date the request was created
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // Date the request was satisfied
  satisfiedAt: {
    type: Date,
    default: null,
    required: false,
  },
  // Has an service provider satisfied the request
  isSatisfied: {
    type: Boolean,
    default: false,
    required: true,
  },
  // ID of the service provider that satisfied the request
  satisfiedBy: {
    type: String,
    required: false,
  },
});

mongoose.model('Request', requestSchema);
