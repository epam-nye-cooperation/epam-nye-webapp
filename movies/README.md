# Movies REST API

A simple HTTP REST API that can handle movies.

## Reference

This webservice is a bit simplified implementation of the `MoviesAPI.ReactJS` API, which can be found here: https://github.com/VarvaraZadnepriak/MoviesAPI.ReactJS .

## Technologies, tools

- Java 11
- Spring Boot
  - Web
  - Validation
  - Data JPA
  - Test
- H2
- Swagger

## Commands

### Running the webservice

```
mvn spring-boot:run
```

The service will run on the default URL: http://localhost:8080

### Running the tests

```
mvn clean test
```

## Tools

### H2 Console

To check the content of the database while the application is running, navigate to: http://localhost:8080/h2-console

Connection details (as configured in `application.yml`)

- JDBC URL: `jdbc:h2:mem:movies`
- User Name: `admin`
- Password: `password`

### Swagger UI

To check the documentation of the REST API and to be able to execute some requests, navigate to: http://localhost:8080/swagger-ui/index.html

## Security

There is also an implementation of our movies API, which is secured with a simple JWT authorization. You can find it in the [complete-with-authorization](./complete-with-authorization/) folder.

The `/authentication` endpoint of the application is not restricted, you can use it to authenticate and retrieve a JWT token. The example only works with a hardcoded user, so you should send it the following request to successfuly authenticate:

```json
{
  "username": "test",
  "password": "password"
}
```

After retrieving the JWT, use it in the `Authorization` header and send it in every request, to access the remaining endpoints of the application:

```http
Authorization: Bearer <token>
```
