# Library Management System - Documentation

## Project Overview

This project is a full-stack library management system with automated CI/CD deployment pipeline. The system allows users to browse books, borrow them, and provides admin functionality for managing the library inventory.

## Architecture Diagrams

### 1. System Architecture

The system follows a three-tier architecture with:
- **Frontend**: React-based user interface
- **Backend**: Node.js/Express API server  
- **Database**: MongoDB for data persistence

```plantuml
@startuml
!include system-architecture.puml
@enduml
```

### 2. CI/CD Deployment Flow

The deployment pipeline automates the entire process from code commit to production deployment:

```plantuml
@startuml
!include cicd-deployment-flow.puml
@enduml
```

### 3. Technology Stack

Overview of all technologies and tools used in the project:

```plantuml
@startuml
!include technology-stack.puml
@enduml
```

## Key Features

### Frontend Features
- **User Authentication**: Login, registration, password reset
- **Book Catalog**: Browse and search library books
- **Borrowing System**: Request and manage book borrowings
- **Admin Dashboard**: Manage books, users, and borrowing records
- **Responsive Design**: Works on desktop and mobile devices

### Backend Features
- **RESTful API**: Clean API design with proper HTTP methods
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for admin and regular users
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and logging

### DevOps Features
- **Containerization**: Docker containers for all services
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Infrastructure as Code**: Terraform for AWS infrastructure
- **Configuration Management**: Ansible for deployment automation
- **Monitoring**: Application and infrastructure monitoring

## Deployment Architecture

### AWS Infrastructure
- **EC2 Instance**: t3.micro instance running the application
- **Elastic IP**: Static IP address for consistent access
- **VPC**: Isolated network environment
- **Security Groups**: Firewall rules for secure access

### Container Setup
- **MongoDB Container**: Database service with persistent storage
- **Backend Container**: Node.js API server
- **Frontend Container**: React application served by NGINX
- **Docker Compose**: Orchestrates multi-container deployment

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset confirmation

### Book Routes (`/api/books`)
- `GET /` - List all books
- `GET /:id` - Get specific book
- `POST /` - Add new book (Admin only)
- `PUT /:id` - Update book (Admin only)
- `DELETE /:id` - Remove book (Admin only)

### Borrow Routes (`/api/borrows`)
- `GET /` - List borrowing records
- `POST /` - Create borrow request
- `PUT /:id` - Update borrow status
- `DELETE /:id` - Cancel borrow request

## Database Schema

### Collections
- **Users**: User accounts and profiles
- **Books**: Book inventory and metadata
- **BorrowRecords**: Borrowing transactions
- **ActivityLogs**: System activity tracking
- **Notifications**: User notifications

## Deployment Process

1. **Code Commit**: Developer pushes code to GitHub
2. **Pipeline Trigger**: Jenkins detects changes via webhook
3. **Build Phase**: Docker images are built and tested
4. **Infrastructure**: Terraform provisions AWS resources
5. **Deployment**: Ansible deploys containers to EC2
6. **Health Checks**: Verify application is running correctly

## Security Measures

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for password security
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Sanitization of user inputs
- **Network Security**: AWS Security Groups for access control

## Performance Optimizations

- **Static File Caching**: NGINX caches static assets
- **Database Indexing**: Optimized MongoDB queries
- **Container Optimization**: Multi-stage Docker builds
- **CDN Ready**: Prepared for content delivery networks

## Monitoring and Logging

- **Application Logs**: Structured logging for debugging
- **Container Logs**: Docker container log aggregation
- **Health Endpoints**: API health check endpoints
- **Error Tracking**: Comprehensive error reporting

## Scalability Considerations

- **Horizontal Scaling**: Ready for load balancer integration
- **Database Scaling**: MongoDB replica sets support
- **Container Orchestration**: Kubernetes-ready architecture
- **Microservices**: Modular design for service separation

## Future Enhancements

- **Email Notifications**: Automated email system
- **Book Recommendations**: AI-powered suggestions
- **Mobile App**: React Native mobile application
- **Advanced Search**: Elasticsearch integration
- **Real-time Updates**: WebSocket notifications