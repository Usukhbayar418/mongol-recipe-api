const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Рецептийн нэр оруулна уу?'],
        trim: true
    }, 
    description: {
        type: String,
        required: [true, 'Тайлбар оруулна уу?']
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: [true, 'Заавар оруулна уу?']
    },
    cookTime: {
        type: Number, 
        required: [true, 'Хугацаа оруулна уу?']
    },
    category: {
        type: String,
        enum: ['цагаан идээ', 'мах', 'гурил', 'ногоо', 'бусад'],
        default: 'бусад'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema)