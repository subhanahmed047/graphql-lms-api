// buildSchema converts a string based schema into a graphql schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Course {
        _id: String!
        title: String!
        credits: Int!
        department: String
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: String!
        firstName: String!
        lastName: String!
        email: String!
        password: String
        role: Role
        createdAt: String!
        updatedAt: String!
    }

    type Enrolment {
        _id: ID!
        user: User!
        course: Course!
        createdAt: String!
        updatedAt: String!
    }

    input CourseInput {
        title: String!
        credits: Int!
        department: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String
        role: Role = STUDENT
    }

    enum Role {
        STUDENT
        INSTRUCTOR
        PARENT
    }

    type RootQuery {
        courses: [Course!]!
        users: [User!]!
        enrolments: [Enrolment!]!
    }

    type RootMutation {
        createCourse(course: CourseInput): Course
        createUser(user: UserInput): User
        enroll(userId: ID!, courseId: ID!): Enrolment 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
