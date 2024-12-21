const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    lastName: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    confirmationToken: {
      type: String,
      default: null
    },
    resetToken: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    },
},
{ timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(user.password, salt);
    user.password = hashedPwd;
  } catch (err) {
    return next(err);
  }
});

module.exports = model('User', userSchema);