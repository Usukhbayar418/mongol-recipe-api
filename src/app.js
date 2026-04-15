require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Монгол рецептийн API ажиллаж байна!' })
})

app.get('/', (req,res) => {
    res.json({ message: 'Монгол рецептийн API ажиллаж байна!' })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server ${PORT} порт дээр ажиллаж байна`)
});