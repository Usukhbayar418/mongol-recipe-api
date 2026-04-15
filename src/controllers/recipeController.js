const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id }).populate('user', 'username email').sort({ createdAt: -1 });
        res.status(200).json({
            count: recipes.length,
            recipes
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'username email');

        if( !recipe ) { 
            return res.status(404).json({message:  'Рецепт олдсонгүй'});
        }

        if(recipe.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Зөвшөөрөлгүй'});
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRecipe = async (req, res) => {
    try {
        const { name, description, ingredients, instructions, cookTime, category } = req.body;

        const recipe = await Recipe.create({
            name, 
            description,
            ingredients,
            instructions,
            cookTime, 
            category,
            user: req.user._id
        });

        res.status(201).json({
            message: 'Рецепт амжилттай үүслээ',
            recipe
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if ( !recipe ) {
            return res.status(404).json({message: 'Рецепт олдсонгүй'});
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'Зөвшөөрөлгүй'});
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        res.status(200).json({
            message: 'Рецепт амжилттай засагдлаа',
            recipe: updatedRecipe
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if(!recipe) {
            return res.status(404).json({message: 'Рецепт олдсонгүй'});
        }

        if (recipe.user.toString() !==req.user._id.toString()) {
            return res.status(403).json({message: 'Зөвшөөрөлгүй'});
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.status(200).json({message: 'Рецепт амжилттай устгагдлаа'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };