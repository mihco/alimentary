const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./common/database');
const defineUser = require('./common/models/User');
const User = defineUser(sequelize)
const authRoutes = require('./authorization/routes');
const userRoutes = require('./users/routes');
app.use(express.json());

app.use('/', authRoutes);

app.use('/user', userRoutes);

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/status', (req,res) => {
    res.json({
        status: 'Running',
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'something went wrong'
    });
});

sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));