const expressAsyncHandler = require("express-async-handler");
const User = require('../Models/UserModel');
const generateToken = require('../config/generateToken');

const registerUser = expressAsyncHandler( async (req, res)=>{
    const {name, email, password,pic} = req.body;

    if(!name || !email || !password) {
        req.status(400);
        throw new Error("Please Fill all the Feilds");
    }
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error("User Already Exists; Try Loging In!");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if(user) {
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin : user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("User not Registered. Please Register Again!");
    }
});


const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Email and Password!");
    }
    
});


const allUsers = expressAsyncHandler( async(req,res) => {
    const keyword = req.query.search ? {
        $or: [ 
            { name: {$regex: req.query.search, $options: "i"} },
            { email: { $regex: req.query.search, $options: "i"} },
        ],
    } 
    : {};

    const users = await User.find(keyword).find({ _id : { $ne : req.user._id}});
    res.send(users);
});

module.exports = {registerUser , authUser, allUsers };