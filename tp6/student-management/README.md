# 🎓 Student Management REST API

[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![OpenAPI / Swagger](https://img.shields.io/badge/Swagger%20UI-OpenAPI%203.1-85EA2D.svg?logo=swagger&logoColor=black)](http://localhost:8080/swagger-ui/index.html)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
[![JUnit 5](https://img.shields.io/badge/Testing-JUnit%205%20%7C%20Mockito-red.svg)](https://junit.org/junit5/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

A robust and lightweight **Student Management RESTful Microservice** built with **Spring Boot**, **Spring Data JPA**, **Hibernate**, and **MySQL**. This application provides complete CRUD operations and statistical queries for student records, features interactive **Swagger / OpenAPI 3.1** documentation, is fully tested with **JUnit 5** & **Mockito**, and is containerized using **Docker Compose**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Database Configuration & Docker](#-database-configuration--docker)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Running](#installation--running)
- [Application Startup](#-application-startup)
- [Swagger / OpenAPI Documentation](#-swagger--openapi-documentation)
- [API Endpoints & Testing](#-api-endpoints--testing)
  - [1. Create / Save Student](#1-create--save-student)
  - [2. Get All Students](#2-get-all-students)
  - [3. Get Student Count](#3-get-student-count)
  - [4. Delete Student](#4-delete-student)
  - [5. Statistics by Year of Birth](#5-statistics-by-year-of-birth)
- [Unit Testing](#-unit-testing)
- [Configuration Properties](#-configuration-properties)

---

## 🌟 Overview

The **Student Management System** is designed following clean architecture and REST best practices. It allows educational institutions to:
- Register and persist student entities with biographical details.
- Query individual and collection records efficiently.
- Calculate real-time totals and aggregate demographics (students grouped by birth year).
- Explore and test endpoints interactively using auto-generated **Swagger UI**.
- Ensure data reliability through automated unit testing and transactional JPA operations.

---

## 🛠 Architecture & Tech Stack

- **Language & Platform:** Java 25
- **Framework:** Spring Boot (Web MVC, Data JPA, Data REST, DevTools)
- **API Documentation:** SpringDoc OpenAPI 3.1 (`springdoc-openapi-starter-webmvc-ui`) & Swagger UI
- **Persistence & ORM:** Hibernate, Spring Data JPA
- **Database:** MySQL 8.0
- **Containerization:** Docker & Docker Compose
- **Testing Suite:** JUnit 5, Mockito
- **Build Tool:** Maven

### System Architecture Flow:
```
[ Client / Postman / Swagger UI ]
                 │ HTTP (JSON)
                 ▼
       [ StudentController ]   <--- REST Endpoints & OpenAPI Annotations (@RestController)
                 │
                 ▼
       [ StudentService ]      <--- Business Logic Layer (@Service)
                 │
                 ▼
       [ StudentRepository ]   <--- Spring Data JPA & Custom JPQL Queries (@Repository)
                 │
                 ▼
     [ MySQL 8.0 Database ]    <--- Docker Containerized Database
```

---

## 📁 Project Structure

```text
tp6/
├── screenshots/                                # Test & execution verification captures
│   ├── terminal showing app successfuly booted.png
│   ├── swagger api doc.png
│   ├── post save test.png
│   ├── get all test.png
│   ├── get count test.png
│   ├── delete test.png
│   └── junit tests passed.png
└── student-management/                         # Spring Boot Application
    ├── docker-compose.yml                      # MySQL 8.0 container setup
    ├── pom.xml                                 # Maven dependencies and configuration
    ├── mvnw / mvnw.cmd                         # Maven wrapper
    └── src/
        ├── main/
        │   ├── java/com/example/studentmanagement/
        │   │   ├── StudentManagementApplication.java  # Main application entry point
        │   │   ├── controllers/
        │   │   │   └── StudentController.java         # REST Controller with Swagger annotations
        │   │   ├── entity/
        │   │   │   └── Student.java                   # JPA Entity
        │   │   ├── repository/
        │   │   │   └── StudentRepository.java         # Data Access Layer & JPQL
        │   │   └── services/
        │   │       └── StudentService.java            # Service Layer
        │   └── resources/
        │       └── application.properties             # App & datasource properties
        └── test/
            └── java/com/example/studentmanagement/
                ├── StudentManagementApplicationTests.java
                └── StudentControllerTest.java         # Mockito unit tests
```

---

## 🐳 Database Configuration & Docker

The service uses **Docker Compose** to spin up an isolated **MySQL 8.0** container.

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  mysql-db:
    image: mysql:8.0
    container_name: springboot-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: studentdb
      MYSQL_USER: devuser
      MYSQL_PASSWORD: 123456
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

To start the database:
```bash
docker-compose up -d
```

---

## 🚀 Getting Started

### Prerequisites

- **JDK 25** (or compatible JDK 17+)
- **Maven 3.8+** (or use included `./mvnw`)
- **Docker & Docker Compose**
- **Browser** or **Postman** for API testing

### Installation & Running

1. **Start the MySQL container:**
   ```bash
   docker-compose up -d
   ```

2. **Build the Spring Boot application:**
   ```bash
   ./mvnw clean package
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on **`http://localhost:8080`**.

---

## 🖥 Application Startup

Once started, the Spring Boot application boots with Tomcat on port `8080` and establishes connection with the MySQL database container.

![Application Successfully Booted](../screenshots/terminal%20showing%20app%20successfuly%20booted.png)

---

## 📖 Swagger / OpenAPI Documentation

The application integrates **SpringDoc OpenAPI 3.1** (`springdoc-openapi-starter-webmvc-ui`), providing interactive API documentation and direct endpoint execution right from the browser.

- **Swagger UI URL:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) (or [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html))
- **OpenAPI JSON Spec:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

Through the Swagger UI dashboard, developers can inspect request bodies, parameter schemas, and test endpoints live:

![Swagger API Documentation](../screenshots/swagger%20api%20doc.png)

---

## 📡 API Endpoints & Testing

All student endpoints are exposed under base URL: `http://localhost:8080/students`.

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| **POST** | `/students/save` | Create or update a student | `201 Created` |
| **GET** | `/students/all` | Retrieve all student records | `200 OK` |
| **GET** | `/students/count` | Retrieve total count of students | `200 OK` |
| **GET** | `/students/byYear` | Group student counts by birth year | `200 OK` |
| **DELETE** | `/students/delete/{id}` | Delete a student by ID | `204 No Content` / `404 Not Found` |

---

### 1. Create / Save Student
- **Endpoint:** `POST /students/save`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "nom": "Handaji",
    "prenom": "Mouad",
    "dateNaissance": "2004-07-01"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "id": 1,
    "nom": "Handaji",
    "prenom": "Mouad",
    "dateNaissance": "2004-07-01T00:00:00.000Z"
  }
  ```

![POST Save Student](../screenshots/post%20save%20test.png)

---

### 2. Get All Students
- **Endpoint:** `GET /students/all`
- **OpenAPI Summary:** `Récupérer tous les étudiants`
- **Response:** `200 OK`
  ```json
  [
    {
      "id": 1,
      "nom": "Handaji",
      "prenom": "Mouad",
      "dateNaissance": "2004-07-01T00:00:00.000Z"
    }
  ]
  ```

![GET All Students](../screenshots/get%20all%20test.png)

---

### 3. Get Student Count
- **Endpoint:** `GET /students/count`
- **Response:** `200 OK`
  ```text
  0
  ```
  *(or current number of registered students)*

![GET Student Count](../screenshots/get%20count%20test.png)

---

### 4. Delete Student
- **Endpoint:** `DELETE /students/delete/{id}`
- **Path Variable:** `id` (e.g., `1`)
- **Response:** `204 No Content` (when deleted successfully) or `404 Not Found`

![DELETE Student](../screenshots/delete%20test.png)

---

### 5. Statistics by Year of Birth
- **Endpoint:** `GET /students/byYear`
- **Custom JPQL Query:**
  ```sql
  SELECT YEAR(s.dateNaissance), COUNT(s) 
  FROM Student s 
  GROUP BY YEAR(s.dateNaissance)
  ```
- **Response:** `200 OK` (JSON collection of `[year, count]` pairs)

---

## 🧪 Unit Testing

The project incorporates unit tests for the controller layer using **JUnit 5** and **Mockito** (`MockitoExtension`). The service layer is isolated using `@Mock`, allowing standalone verification of HTTP status codes and responses.

### Executed Tests:
- `testSaveStudent()`: Verifies that saving returns `HttpStatus.CREATED` with student details.
- `testFindAllStudents()`: Verifies retrieval of all entities and `HttpStatus.OK`.
- `testCountStudents()`: Verifies count logic and returned value.
- `testFindByYear()`: Validates custom grouping endpoint.
- `testDeleteStudent()`: Validates successful removal returning `HttpStatus.NO_CONTENT`.

![JUnit Tests Passed](../screenshots/junit%20tests%20passed.png)

To run the unit tests via terminal:
```bash
./mvnw test
```

---

## ⚙️ Configuration Properties

Located in `src/main/resources/application.properties`:

```properties
spring.application.name=student-management

# MySQL Datasource
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=devuser
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## 👤 Author

Developed as part of the Microservices & Spring Boot practical lab series.
