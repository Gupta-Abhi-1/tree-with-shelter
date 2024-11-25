 Hotel Booking Website(Tree With Shelter)
 
This is a hotel booking website built using Node.js and Express.js with MongoDB as the database. The application follows the MVC (Model-View-Controller) design pattern and incorporates user authentication, authorization, and error handling for a smooth and secure user experience.

Features:
1. User Authentication
Login and Signup functionality for user registration and access.
Passport is used for managing user authentication, ensuring secure login with session-based management.
![login Screenshot](https://drive.google.com/file/d/1ZWg_5c3K77XDh4-WZnXtM8y0Ejisg1ja/view?usp=drive_link)
![userAuthentication for show page](https://drive.google.com/file/d/11lJ1S09WScPOi05v4NeAsiE2-G5XY3m3/view?usp=drive_link)

2. User Authorization
Users are allowed to delete their own reviews only, ensuring they can only modify content they’ve submitted.
This is handled through user-specific authorization using Passport.
![reviewAuthorization](https://drive.google.com/file/d/1c4ivl0-cgUCLTMojaddWiUqhNuuStNCi/view?usp=drive_link)

3. Database Management
MongoDB is used for storing user data, bookings, and reviews in a NoSQL format, making it scalable and efficient for large datasets.

4. Session Management
Express-session middleware is used to manage user sessions, ensuring that users remain logged in across multiple pages during their visit.
![sessions](https://drive.google.com/file/d/19pXqrHsBWg_HDz1Wcf60BgdokYYoQEE_/view?usp=drive_link)

5. Error Handling
The app includes robust error handling middleware to catch and respond to errors effectively.
![error handeling using expressError](https://drive.google.com/file/d/1K6j6x5R-sWIm-91MtsZYaUc76ZaZtwiK/view?usp=drive_link)
![error handeling using wrapasyn](https://drive.google.com/file/d/1Lr67rH-6i_5pVIGcKqTatBXPWKwdEuL6/view?usp=drive_link)

Technologies Used:
Node.js
Express.js
MongoDB
Passport for Authentication
Express-session for Session Management
MVC Pattern for Structured Code

Installation
To run the project locally:

1. Clone the repository:

Copy code-
git clone <repository-url>

2. Install dependencies:

Copy code-
npm install

Copy code-
npm install express

Copy code-
npm install express-session

Copy code-
npm install connect-flash

Copy code-
npm install passport

Copy code-
npm install passport-local

Copy code-
npm install passport-local-mongoose

Copy code-
npm install mongoose

3. Start the server:

Copy code-
nodemon index.js

Visit http://localhost:8080/listings in your browser to view the website.

License
This project is licensed under the MIT License - see the LICENSE file for details.

This README provides an overview of the website's features, installation, and the technologies used to build it.




