const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    fatherName: { type: String, default: '' },
    fullName: { type: String, default: '' },
    age: { type: Number, default: 18 },
    isConscript: { type: Boolean, default: true },
    address: { type: String, default: '---' },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: 'Conscript',
  }
);

module.exports = model('Conscript', schema);
