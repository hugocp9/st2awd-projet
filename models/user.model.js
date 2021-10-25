const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// user model for database management

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        pass: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024
        }
    },
    {
        timestamps: true
    }
);

// encryption of password before save into db
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('incorrect password');
    } throw Error('incorrect email');
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
