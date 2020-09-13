# NestJS and TypeORM with JSON Web Token (JWT) Authentication

This project is intended to be a starter template for people trying to get authentication working on with NestJS.

## Authentication

In a literal sense, "authentication" refers to the act of proving some assertion, whether it be the identity of a person or the user of a computer system. It is not necessarily the process of identifying whatever the credentials may be but rather the process of verifying them.

With the power of authentication, we can have things like permissions and guards that serve to prevent users who are not authorized or who are forbidden towards committing certain actions or having access to particular pages. There are multiple ways of implementing this and one of them involves a protocol called the "JSON Web Token" or JWT. 

## Getting Started

Besides running `npm install` to get all of the dependencies you need, it's import that you create an `.env` file in the project's root directory containing two environment variables needed for the authentication and validation to work. In the file you need to specify a secret for the JWT mechanism to use and also an expiration time for the cookie.

```
JWT_SECRET=mysecret
JWT_EXPIRES_IN=21600s
```

With this, the server should be good to get started handling requests. Thanks for checking out this repository!
