 # Hotel Booking Website(Tree With Shelter)
 
This is a hotel booking website built using Node.js and Express.js with MongoDB as the database. The application follows the MVC (Model-View-Controller) design pattern and incorporates user authentication, authorization, and error handling for a smooth and secure user experience.

## Features:
1. User Authentication
Login and Signup functionality for user registration and access.
Passport is used for managing user authentication, ensuring secure login with session-based management.
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/login.png" width="400">
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/userauthentication-show.png" width="400">

3. User Authorization
Users are allowed to delete their own reviews only, ensuring they can only modify content they’ve submitted.
This is handled through user-specific authorization using Passport.
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/reviewauthorisation.png" width="400">

4. Database Management
MongoDB is used for storing user data, bookings, and reviews in a NoSQL format, making it scalable and efficient for large datasets.

5. Session Management
Express-session middleware is used to manage user sessions, ensuring that users remain logged in across multiple pages during their visit.
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/sessions.png" width="400">

6. Error Handling
The app includes robust error handling middleware to catch and respond to errors effectively.
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/express-error.png" width="400">
<img src="https://github.com/Gupta-Abhi-1/tree-with-shelter/blob/main/assets/images/wrapasyn.png" width="400">

## Technologies Used:
Node.js,
Express.js,
MongoDB,
Passport for Authentication,
Express-session for Session Management,
MVC Pattern for Structured Code

Installation
To run the project locally:

1. Clone the repository:
```bash
git clone https://github.com/Gupta-Abhi-1/tree-with-shelter
```

2. Install dependencies:
```bash
npm install express express-session mongoose connect-flash passport passport-local passport-local-mongoose
```

3. Start the server on ```http://localhost:8080/listings```:
```bash
nodemon index.js
```

## License
This project is licensed under the MIT License - see the ![License](LICENSE) file for details.




