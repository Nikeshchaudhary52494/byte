const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot excced 30 character"],
        minLength: [4, "Name should have atleast 4 character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: [true, "email Id already registerd"],
        validate: [validator.isEmail, "Please Enter a valid email"],

    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "password should have 8 character minimum"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    verificationToken: String,
    verified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)

}

// GEneratiing Password reseting token
userSchema.methods.getResetPasswordToken = function () {
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and add to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}


module.exports = mongoose.model("User", userSchema);
