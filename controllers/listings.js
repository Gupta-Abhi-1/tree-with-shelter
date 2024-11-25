const Listing= require("../models/listing");

// index route
module.exports.index= async(req,res)=>{
    const allListings= await Listing.find({});
     res.render("index.ejs", {allListings})
     };


    //  show route
   module.exports.show= async(req,res)=>{
        if(!req.isAuthenticated()){
               req.flash("failure","User must be logged in!");
               return res.redirect("/listings");
        };
        let {id}= req.params;
        const listing= await Listing.findById(id).populate(
            {path: "reviews",
                populate: {
                    path: "author",
                }
            });
        res.render("show.ejs", {listing})
    };