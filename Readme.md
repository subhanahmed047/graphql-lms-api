# Graphql LMS API

## Requirements

You need the following few things in order to get this project up and running on your local machine:

- Make sure the current lts version of [Node JS](https://nodejs.org/en/)is installed on your machine.
- Download and Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable).

## Clone

Clone the project on your machine.

## Setup Environment Variables

- Create a file named `nodemon.json` in the project root. (This file is git ignored on purpose).
- Add the following contents to this file:

```
{
  "env": {
    "MONGO_USER": "YOUR_USER_NAME",
    "MONGO_PWD": "YOUR_PASSWORD",
    "MONGO_DB": "DATABASE_NAME"
  }
}
```

- Ask the admin (Subhan or Faran), to setup the above credentials for you.

## Install Dependencies and Run

1. In the project root, type in `yarn install`, this will install all the dependencies in the project.
2. Run the following command to run the project after the dependencies are installed:
   ```
   yarn start
   ```
3. Goto the `localhost:8000/api` to view the graphql api.
4. Play around by adding the queries and mutations.

## Git Structure

We follow the following git conventions:

- `master` branch only contains the latest released app.
- `develop` branch contains all the developed features (released and unreleased).
- In order to start working on something, create a branch with the following conventions:
  - If its a new feature, create the following branch: `feature/<feature-name>`
  - If its a bugfix, create the following branch: `bug/<bug-name>`
  - If its a release candidate, then create: `rc/<version-and-name>`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
