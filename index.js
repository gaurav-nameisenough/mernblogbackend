const express = require('express');

const app = express();

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const authRoute = require("./routes/auth");

const userRoute = require("./routes/users");

const postRoute = require("./routes/Posts");

const categoriesRoute = require("./routes/Categories");

const multer = require("multer");

const path = require('path');

const cors = require('cors');

app.use(cors({
    origin: "https://reactnodeblog.netlify.app/",
}));

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/images", express.static(path.join(__dirname,"/images")));


mongoose.set('strictQuery', false);




mongoose.connect(process.env.MONGO_URL).then(console.log("connected successfully")).catch((err)=>{
    console.log(err);
})

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images");
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=> {
    res.status(200).json("file has been uploaded");
})


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories",categoriesRoute);



app.listen( PORT, ()=>{
    console.log("listening to port " + PORT);
})