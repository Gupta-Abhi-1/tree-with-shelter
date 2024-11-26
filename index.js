
const express= require("express");
const app= express();
const mongoose= require("mongoose");
const initData= require("./init/data.js");
const Listing= require("./models/listing.js");
const Review= require("./models/review.js");
const {reviewSchema}=require("./Schema.js");
const methodOverride = require('method-override');
const session= require("express-session");
const flash= require("connect-flash");
const passport= require("passport");
const LocalStrategy= require("passport-local");
const User= require("./models/user.js");
const listingController= require("./controllers/listings.js");
const reviewController= require("./controllers/reviews.js");
const userController= require("./controllers/users.js");
const {reviewAuthor, validateReview}= require("./middleware.js");


const engine= require("ejs-mate");
const path= require("path");

const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");


const mongo_Url= "mongodb://127.0.0.1:27017/treewithshelter";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(mongo_Url);
}


app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs", engine);
app.use(methodOverride('_method'));
app.use(flash());

const sessionOptions={
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
    expires: Date.now() + 1000*60*60*24*3,
    maxAge: 1000*60*60*24*3,
    httpOnly: true,
    }
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res)=>{
 res.send("the page is linked")
});

app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.failure= req.flash("failure");
    res.locals.currUser= req.user;
    next();
});


// index route
   app.get("/listings",wrapAsync(listingController.index));

// show route
app.get("/listings/:id", wrapAsync(listingController.show));

// review route
app.post("/listings/:id/reviews", validateReview, wrapAsync(reviewController.review));

// review delete route
app.delete("/listings/:id/reviews/:reviewId", reviewAuthor, wrapAsync(reviewController.deleteReview));

// signup route
app.get("/signup", userController.getSignup);

app.post("/signup", wrapAsync(userController.postSignup));

// login route
app.get("/login", userController.getLogin);

app.post("/login",
     passport.authenticate("local", {
     failureRedirect:("/login"),
     failureFlash: true}),
     wrapAsync(userController.postLogin));

    //  logout route
app.get("/logout", userController.logout);

app.all("*", (req,res,next)=>{
    next(new ExpressError(404, "Page Not Found"));
 });
  
   const initDb= async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data has been saved");
     };
 
 initDb();



 app.use((err,req,res,next)=>{
    let {statusCode, message}= err;
    res.status(statusCode).send(message);

 });

app.listen(8080, ()=>{
    console.log("port is listening");
})
