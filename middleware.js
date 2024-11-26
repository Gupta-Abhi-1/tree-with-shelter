const Listing= require("./models/listing.js");
const Review= require("./models/review.js");
const {reviewSchema}=require("./Schema.js");

module.exports.reviewAuthor= async(req,res,next)=>{
    let {id, reviewId}= req.params;
    let review= await Review.findById(reviewId);
    if (review && review.author) {
        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("failure", "You are not the author of the review!");
          return res.redirect(`/listings/${id}`);
        }}
   next();
};



module.exports.validateReview= (req,res,next)=>{
    let {err}= reviewSchema.validate(req.body);
    if(err){
        let errMsg= err.details.map((el)=> el.msg).join;
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};