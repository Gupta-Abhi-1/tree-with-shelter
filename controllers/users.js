const User= require("../models/user");

// login route
module.exports.getLogin= (req,res)=>{
    res.render("login.ejs");
};

module.exports.postLogin= async(req,res)=>{
    req.flash("success", "Welcome on Tree With Shelter");
    res.redirect("/listings");
 };

 // signup route
 module.exports.getSignup= (req,res)=>{
    res.render("signup.ejs");
 };

 module.exports.postSignup= async(req,res)=>{
    try{
        let {username, email, password}= req.body;
    const newUser= new User({username, email});
    const registeredUser= await User.register(newUser, password);
    req.login(registeredUser, function(err) {
        if (err) {
             return next(err);
             }
    req.flash("success", "Welcome on Tree With Shelter");
    res.redirect(`/listings`);
    })}
    catch(e){
        req.flash("failure", e.message);
        res.redirect(`/signup`);
    }
};

 //  logout route
 module.exports.logout= (req,res,next)=>{
    req.logout((err)=>{
    if(err){
      return next(err)
    }
      req.flash("success", "you are logged out!");
      res.redirect(`/listings`);
    })
  };