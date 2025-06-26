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