const mongoose= require("mongoose");
const initData= require("./data.js");
const Listing= require("./models/listing.js");

const mongo_Url= "mongodb://127.0.0.1:27017/treewithshelter";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(mongo_Url);
};

const initDb= async ()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("data has been saved");
};

initDb();
