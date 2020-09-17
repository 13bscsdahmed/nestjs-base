import * as mongoose from 'mongoose';
import * as bcrypt  from 'bcryptjs';


export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

UserSchema.pre('save', function (next) {
  
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  // generate a salt
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    
    // hash the password using our new salt
    return bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);
      
      // override the cleartext password with the hashed one
      this.password = hash;
      return next();
    });
  });
});

export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  userType: string,
  password: string
}
