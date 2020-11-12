const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrolmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
); // timestamp adds createdAt, and updatedAt automatically

module.exports = mongoose.model('Enrolment', EnrolmentSchema);
