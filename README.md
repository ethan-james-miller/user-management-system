# User Management System

## Project Overview

The User Management System is a lightweight, efficient solution designed for small to medium-sized businesses and startups. This system allows administrators to easily add, view, and manage user information, providing a streamlined approach to user management.

## Key Features

- View user list
- Add new users
- View individual user details
- Display custom messages for users

## Technology Stack

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- SQLite3

## System Requirements

- Node.js v12.0.0 or higher
- npm v6.0.0 or higher

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/ethan-james-miller/user-management-system.git
   ```

2. Navigate to the project directory:

   ```
   cd user-management-system
   ```

3. Install the required packages:
   ```
   yarn
   ```

## Running the Application

1. Start the server with the following command:

   ```
   yarn start
   ```

2. Access the application by navigating to `http://localhost:8080` in your web browser.

## Usage Guide

### Viewing User List

- Access the homepage (`/`) to view a list of all currently registered users.

### Adding a New User

1. Use the "Add New User" form at the bottom of the homepage.
2. Enter the username and email, then click the "Add User" button.
3. Alternatively, you can add a user directly via URL using the following format:
   ```
   http://localhost:8080/add-user?username=newuser&email=newuser@example.com
   ```

### Viewing Individual User Details

- Click on a user's name in the user list, or use the following URL format:
  ```
  http://localhost:8080/user/[user_id]
  ```

### Displaying Custom Messages for Users

- You can display a custom message on a user's details page using the following URL parameter:
  ```
  http://localhost:8080/user/[user_id]?message=Hello%20User
  ```

## Contributing

We welcome contributions to the User Management System. If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

## Contact

Project Manager - project-manager@example.com

Project Link: https://github.com/your-company/user-management-system

---

© 2023 Your Company Name. All Rights Reserved.
