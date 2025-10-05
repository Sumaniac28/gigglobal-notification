# Notification Service

## Overview
The Notification Service handles all email communications for the GigGlobal platform. It processes notification requests from other microservices via message queues and sends emails using pre-configured templates for various user actions and system events.

## Core Functionality
- **Email Template Management:** Pre-built HTML email templates for different notification types
- **Queue-Based Processing:** Asynchronous email processing using RabbitMQ message queues
- **Multi-Channel Notifications:** Supports authentication emails, order notifications, and system alerts
- **Email Service Integration:** Configured for SMTP-based email delivery
- **Error Handling:** Robust error handling and retry mechanisms for failed email deliveries

## Architecture Components

### Message Queue Integration
- **RabbitMQ Connection:** Establishes connection to message broker for queue processing
- **Exchange Configuration:** Uses direct exchanges for targeted message routing
- **Queue Binding:** Separate queues for authentication and order-related notifications
- **Message Acknowledgment:** Ensures reliable message processing with acknowledgments

### Email Processing Workflow
- **Auth Email Queue:** Processes authentication-related emails (signup, login, password reset, OTP)
- **Order Email Queue:** Handles transaction-related notifications (order placement, delivery, receipts)
- **Template Rendering:** Dynamic content injection into HTML email templates
- **Delivery Tracking:** Logs email delivery status and errors

## Email Template Categories

### Authentication Emails
- **Email Verification:** Welcome emails with verification links for new user accounts
- **Password Reset:** Secure password reset links with expiration handling
- **OTP Verification:** One-time password codes for device verification and security
- **Password Reset Success:** Confirmation emails after successful password changes

### Order Management Emails
- **Order Placement:** Confirmation emails for new order creation
- **Order Receipt:** Detailed receipt with transaction information and payment breakdown
- **Order Delivery:** Notification when orders are marked as delivered
- **Order Extension:** Notifications for delivery timeline extensions and approvals
- **Custom Offers:** Email notifications for special offers between buyers and sellers

## Message Processing Flow
1. **Message Reception:** Receives messages from other services via RabbitMQ queues
2. **Message Parsing:** Extracts email data, recipient information, and template type
3. **Template Selection:** Chooses appropriate email template based on notification type
4. **Content Injection:** Populates template with dynamic user and transaction data
5. **Email Sending:** Delivers email using configured SMTP transport
6. **Acknowledgment:** Confirms successful message processing to queue

## Queue Configuration

### Authentication Queue
- **Exchange:** `gigglobal-email-notification`
- **Routing Key:** `auth-email`
- **Queue Name:** `auth-email-queue`
- **Message Types:** Email verification, password reset, OTP codes, password change confirmations

### Order Queue  
- **Exchange:** `gigglobal-order-notification`
- **Routing Key:** `order-email`
- **Queue Name:** `order-email-queue`
- **Message Types:** Order confirmations, receipts, delivery notifications, extensions, offers

## Development Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```env
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   RABBITMQ_ENDPOINT=amqp://localhost
   SENDER_EMAIL=noreply@gigglobal.com
   SENDER_EMAIL_PASSWORD=your_app_password
   ELASTIC_SEARCH_URL=http://localhost:9200
   KIBANA_DASH_USERNAME=kibana_user
   KIBANA_DASH_PASSWORD=kibana_password
   ```

3. Start the service:
   ```bash
   npm run dev
   ```

## Project Structure
```
src/
├── app.ts                    # Application entry point and service initialization
├── server.ts                # Server setup with queue consumers and health routes
├── config.ts                # Environment configuration and settings
├── elasticsearch.ts         # Elasticsearch connection for logging
├── error-handler.ts         # Centralized error handling middleware
├── helpers.ts               # Utility functions for email processing
├── routes.ts                # Health check and status endpoints
├── emails/                  # Email template directories
│   ├── forgotPassword/      # Password reset email templates
│   ├── verifyEmail/        # Email verification templates
│   ├── otpEmail/           # OTP verification email templates
│   ├── resetPasswordSuccess/ # Password reset success templates
│   ├── orderPlaced/        # Order confirmation templates
│   ├── orderReceipt/       # Order receipt templates
│   ├── orderDelivered/     # Order delivery notification templates
│   ├── orderExtension/     # Order extension request templates
│   ├── orderExtensionApproval/ # Order extension approval templates
│   └── offer/              # Custom offer email templates
└── queues/                 # Message queue handling
    ├── connection.ts       # RabbitMQ connection management
    ├── email.consumer.ts   # Email message consumers
    └── mail.transport.ts   # Email sending transport configuration
```

## Email Template Structure
Each email template directory contains:
- `html.hbs` - HTML template with Handlebars placeholders
- `text.hbs` - Plain text version of the email
- Template-specific styling and branding elements

## Integration Points
- **Auth Service:** Receives authentication-related email requests
- **Order Service:** Processes order lifecycle email notifications  
- **Users Service:** Handles profile-related email communications
- **System Services:** Processes administrative and system notification emails

---
