const mongoose = require('mongoose');

const tripSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Should be at least 5 chars'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    description: {
      type: String,
      validate: [
        {
          validator: rawValue => {
            try {
              JSON.parse(rawValue);
              return true;
            } catch (e) {
              return false;
            }
          },
          msg: 'Description has incorrect format',
        },
        {
          validator: rawValue => {
            try {
              const value = JSON.parse(rawValue);
              let count = 0;
              value.blocks.forEach(({ text }) => {
                count += text.length;
              });
              return count > 100;
            } catch (e) {
              return false;
            }
          },
          msg: 'Should have at least 100 chars',
        },
      ],
      required: [true, 'Description is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Should be at least 1'],
      max: [365, 'Should be less than 366'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating is required'],
      max: [5, 'Incorrect value is provided'],
    },
    expences: {
      type: Number,
      required: [true, 'Expenses is required'],
      min: [0, 'Should be non negative'],
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };
