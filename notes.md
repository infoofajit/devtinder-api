EP3
- Create a repository
- Initialize the repository
- Node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listern to port 8000, 7777
- Write request handler for /test, /hello etc.
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (package dependencies)

EP4
- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with route and route extentions ex. /hello, hello/2, /xyz
- Order of route matter a lot
- Install Postman app and make a workspace/collection > test API call
- Write login to handle GET, POST, PUT, PATCH, DELETE API call and test them on postman
- Explore routing and use of ?, +, (), * in the route
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

EP5
- Multiple route handler (nexting route handler) - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", RH, [HR2, RH3], RH3)
- What is middleware, why do we need it
- How express js handle request behind the scenes
- Diff app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user route except /user/login
- Error handling using app.use("/", (err, req, res, next) => {})

EP6
- Create a free custer on Mongo DB official website (Mongo Atlas)
- Install mongoose library
- Connect your applicatio to the database "<ConnectionURL>/<DBName>;
- Call the connectDB function and connect to database before starting application on 7777
- Create a user schema & user model
- Create a POST signup API to add data to DB
- Push some documents using API call from postman
- Error handling using try catch

EP7
- Difference between JS object and JSON object
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- API - get user by email/name, Feed API to get all users from DB
- Create a delete user API
- Create a update user API
- Difference between PATCH vs PUT

EP8
- Explore schema type from the documentation
- Add require, unique, min etc 
- Add default
- Create a custom validator function for gender
- Improve the DB schema
- Add timestamp to the schema
- Add API level validation on Patch and Post API
- Data sanitizing - Add API validation for each field
- Install and explore the validator library
- Use schema lever validator function for password, email validation

EP9
- Validate data in signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is encrypted password
- Create login API
- Campare password and throw errors if email or password is invalid

EP10
- Install cookie-parser
- Just send a dummy cookie to user
- Create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email/password validation, create a JWT token and send it to user
- Read the cookie inside your profile API and find the loggedin user
- userAuth middleware
- Add the authUser middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7days
- Create UserScheme method to comparePassword, getJWT

EP11
- Explore tinder APIs, and data inside
- Create a list of all APIs you can think of in DevTinter
- Group multiple routes under respective routers
- Read documentation for express.Routers()
- Create routes folder for managing auth, profile and request router
- Create authRouter, profileRouter etc.
- Import these router in app.js
- Create /logout api
- Create /profile/edit API
- Create /profile/password API - forgot password API
- Make you validate all data in every POST, PATCH APIs 