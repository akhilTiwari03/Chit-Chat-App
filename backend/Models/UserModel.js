const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique:true },
    password: { type: "String", required: true },
    pic: {
        type: "String", 
        required : true,
        default:
            "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default : false,
    },

}, { timestamps: true }
);
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
    if(!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});
const User = mongoose.model("User", userSchema);

module.exports = User;
