require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const incomeRouter = require("./src/Route/incomeRouters");
const connectDb = require("./src/Config/db");
const authRouter = require("./src/Route/authRouters");
const expanseRoutes = require("./src/Route/expancesRouters");
const dashboardRoutes = require("./src/Route/dashboardRouters");



// Middleware handle to cors 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

app.use(cors({
    origin : process.env.CLINT_URL || "*",
    credentials : true,
    methods : ["GET" , "POST" , "PUT" , "PATCH" , "UPDATE"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}));

// Routers

app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/income" , incomeRouter);
app.use("/api/v1/expanse" , expanseRoutes);
app.use("/api/v1/dashboard" , dashboardRoutes);


app.get("/" , async(req , res) =>{
    res.send({message : "Expances Tracke Application Server"});
});

// Connect Database
connectDb();

app.use("/Uploads" , express.static(path.join(__dirname , "Uploads")))

app.listen(port , () => {
    console.log(`Server Runing on port ${port}`);
    console.log(`http://localhost:${port}`);
});


