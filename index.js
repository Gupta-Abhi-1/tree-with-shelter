
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


app.get("/", (req,res)=>{
 res.send("the page is linked")
});

app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    next();
});

const validateReview=(req,res,next)=>{
    let {err}= reviewSchema.validate(req.body);
    if(err){
        let errMsg= err.details.map((el)=> el.msg).join;
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

// index route
app.get("/listings", wrapAsync(async(req,res)=>{
  const allListings= await Listing.find({});
   res.render("index.ejs", {allListings})
   }));
   
// show route
app.get("/listings/:id", wrapAsync(async(req,res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id).populate("reviews");
    res.render("show.ejs", {listing})
}));

// review route
app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req,res)=>{
   let listings= await Listing.findById(req.params.id);
   let newReview= new Review(req.body.review);
   listings.reviews.push(newReview);

  await newReview.save();
  await listings.save();
  console.log("review has saved");
  req.flash("success","New review has added");
  res.redirect(`/listings/${listings._id}`);
}));

// review delete route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId}= req.params;
   await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
 await  Review.findByIdAndDelete(reviewId);
 redirect(`/listings/${id}`);
}));


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
});