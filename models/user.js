const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Role = require('./roles');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: Role,
      required: true,
    },
    enrollments: {
      type: Schema.Types.ObjectId,
      ref: 'Enrolment',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
