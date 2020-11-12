const bcrypt = require('bcryptjs');
const Course = require('../../models/course');
const User = require('../../models/user');
const Enrolment = require('../../models/enrolment');
const Role = require('../../models/roles');

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: '••••••••',
      createdAt: new Date(user._doc.createdAt).toISOString(),
      updatedAt: new Date(user._doc.updatedAt).toISOString(),
    };
  } catch (err) {
    throw err;
  }
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  return {
    ...course._doc,
    _id: course.id,
    createdAt: new Date(course._doc.createdAt).toISOString(),
    updatedAt: new Date(course._doc.updatedAt).toISOString(),
  };
};

module.exports = {
  courses: async () => {
    try {
      const courses = await Course.find();
      return courses.map((course) => {
        return {
          ...course._doc,
          _id: course.id,
          createdAt: new Date(course._doc.createdAt).toISOString(),
          updatedAt: new Date(course._doc.updatedAt).toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          password: '••••••••',
          createdAt: new Date(user._doc.createdAt).toISOString(),
          updatedAt: new Date(user._doc.updatedAt).toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  enrolments: async () => {
    try {
      const enrolments = await Enrolment.find();
      return enrolments.map((enrolment) => {
        return {
          ...enrolment._doc,
          user: getUserById.bind(this, enrolment._doc.user),
          course: getCourseById.bind(this, enrolment._doc.course),
          createdAt: new Date(enrolment._doc.createdAt).toISOString(),
          updatedAt: new Date(enrolment._doc.updatedAt).toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createCourse: async ({ course }) => {
    try {
      const { title, credits, department } = course;
      const newCourse = new Course({ title, credits, department });
      const savedCourse = await newCourse.save();
      return {
        ...savedCourse._doc,
        _id: savedCourse.id,
        createdAt: new Date(savedCourse._doc.createdAt).toISOString(),
        updatedAt: new Date(savedCourse._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ user }) => {
    try {
      const { firstName, lastName, email, password, role } = user;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error(`User with the email: ${email} already exists!`);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });
      const savedUser = await newUser.save();
      return {
        ...savedUser._doc,
        _id: savedUser.id,
        password: '••••••••',
        createdAt: new Date(savedUser._doc.createdAt).toISOString(),
        updatedAt: new Date(savedUser._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      throw err;
    }
  },
  enroll: async ({ userId, courseId }) => {
    try {
      const existingEnrollment = await Enrolment.findOne({
        course: courseId,
        user: userId,
      });
      if (existingEnrollment) {
        throw new Error('This user has already enrolled this course');
      }

      const user = await User.findOne({ _id: userId });
      if (user._doc.role !== Role.STUDENT) {
        throw new Error('Only Students can enroll in this course');
      }

      const course = await Course.findOne({ _id: courseId });
      const newEnrolment = new Enrolment({ user, course });
      const savedEnrolment = await newEnrolment.save();
      return {
        ...savedEnrolment._doc,
        _id: savedEnrolment.id,
        createdAt: new Date(savedEnrolment._doc.createdAt).toISOString(),
        updatedAt: new Date(savedEnrolment._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      throw err;
    }
  },
};
