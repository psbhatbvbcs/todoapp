import express from "express";
const app = express();




import mongoose from "mongoose";
mongoose
    .connect("mongodb://127.0.0.1:27017", {
        dbName: "backendapi",
    })
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", schema);


//Using middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.send("nice working");
})


app.get("/users/all", async (req, res) => {
    
    const users = await User.find({})

    console.log(req.query);

    res.json({
        success: true,
        users,
    })
})

// this should get executed before dynamic urls with PARAMS,
// this is because if dynamic url was kept before, 
// before going to this below url it would execute that and give error
// IMPORTANT TO KEEP DYNAMIC URLS AT THE END
app.get("/userid/special", (req, res) => {
    res.json({
        success: true,
        message: "Just joking"
    })
})


//app.get("/userid", async (req, res) => {
app.get("/userid/:id", async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    //console.log(req.params);

    res.json({
        success: true,
        user
    })

})

app.post("/users/new", async (req, res) => {

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    })

    res.cookie("tempi", "lol");
    res.status(201).json({
        success: true,
        message: "Signed Up successfully",
    })
})

app.listen(5000, () => {
    console.log("Server is working");
})