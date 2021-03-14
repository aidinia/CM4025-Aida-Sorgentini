import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: "Password is required"
        },
        salt: String,
        updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    muggle:{
        type: Boolean,
        default: true
    },
    plantLover: {
        type: Boolean,
        default: false
    },
    plants: {
        type: Array,
        default: []
    }, 
    stats:{
        plants:{
           type: Object
        },
        death:{
            type: Number,
            default: 0
        },
        button:{
            click: {
                type: Number,
                default: 0
            },
            actions:{
                type: Array,
                default: []
            }
        }
    }

})

UserSchema
 .virtual('password')
 .set(function(password) {
 this._password = password
 this.salt = this.makeSalt()
 this.hashed_password = this.encryptPassword(password)
 })
 .get(function() {
 return this._password
 })

 UserSchema.methods = {
    authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
    if (!password) return ''
    try {
    return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex')
    } catch (err) {
    return ''
    }
    },
    makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
    }
   } 

   UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 8) {
    this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
    }
   }, null)


export default mongoose.model('User', UserSchema)
