const {Schema, model} = require('mongoose');

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    course: {
        ref: 'Course',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
});

module.exports = model('Topic', topicSchema);