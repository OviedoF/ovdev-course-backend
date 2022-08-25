const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dirname: {
        type: String,
        required: true
    },
    mini_description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{
        ref: 'Topic',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

module.exports = model('Course', courseSchema);