var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');



var UserSchema = mongoose.Schema({
  familyName: String,
  address: String,
  phoneNumber: String,
  numFamilyMembers: Number,
  monthlyGallons: Number,
  dailyGallons: Number,
  competition: String

  // {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Competition'
  // }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

