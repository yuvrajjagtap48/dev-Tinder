- Create a repository 
- Initialize the repository
- node_modules, package.json, package-lock.json
- Insatll express
- create a server
- Listen to port 3000
- Write request handlers for /test, /hello
- install nodemon and updates scripts inside package.json


- Play with routes and route extensions ex . /hello , /hello/2
- Order of the rotes matters a lot 
- Explore routing and use of ?, +, (), * in the routes 
- Use of regex in routes /a/, /*fly$/
- reading the query params in the routes 
- reading the dynamic routes 


- Multiple route handlers 
- next() 
- next function and error along with res.send()
- app.use ("/route", rH , rH2, [rH3, rH4], rH5)
- middlewares 
- How express JS basically handle requests behind the scenes 
- Diffrence between app.use and app.all
- Write a dummy middleware for admin
- Error Handling using app.use("/", (err, req, res, next)=> {});


- Created a free cluster on MongoDB compass
- Install mongoose library 
- conncet application to the databse 
- call the conncetDB function and conncet to database before statring application on 3000
- Created a userSchema and userModel
- Created /signup API to add data to databse 



- JS Object vs JSON (diffrenece)
- Added express.json middleware to app
- Make signup API dynmaic to recive data from the user
- Used User.find() 
- Create a Delete user API
- diffrence ber=tween PATCH and PUT API
- Explore the Mongoose Documents for Model methods 



- Explore schemeType options from the documention
- add reqiued, unique, lowercase, min, minlength, trim
- Create a custom validate function for gender
- Improve the DB schema - put all appropiate validations on each field in schema 
- add timetamps to te userSchema
- DATA Sanitizing - Add API validation for each field 
- Install Validator
- Explore validator library function and use it for password, email, URL
- NEVER TRUST req.body =>  it will bring malicious data into website and always keep validation


- Validate data in Signup API
- Install bcrypt package 
- Create passwordhas using bcrypt.hsh & save the user is excuted password 
- Created login API
- Compare passwords and throw errors if email or password is invalid 


- Install Cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back (res.cookie("token", token))
- Install jsonwebtoken 
- In login API ,after email and password validation, create a JWT token and send it to user in cookies 
- read the cookies inside your profile API and find the logged in user 
- UserAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days 
- Create a schema method to getJWT()
- Create a schema method to comparepassword(passwordInputByUser)


- Explore tinder APIs
- created list of all APIs in DevTinder
- Group multiple routes under respective routes 
- create routes folder for managing auth,profile,request routers
- create authRouter, profileRouter, requestRouter
- Import these routes in app.js
