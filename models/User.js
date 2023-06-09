const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            trpe: String,
            unique: true,
            required: true,
            trim: true,
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectedId,
                ref: 'Thought'
            }
        ],
        friends: [{
            type: Schema.Types.ObjectedId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;