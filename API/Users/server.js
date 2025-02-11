const express = require('express');
const userRoutes = require('./routes/userRoutes');
// cors
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration des routes
app.use('/auth', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.clear();
    console.log('\n\x1b[32m%s\x1b[0m', `  NODE JS ${process.version}\n`);
    console.log('\x1b[32m%s\x1b[0m', `  ➜  `, `\x1b[1mLocal:\x1b[0m   `, '\x1b[34m', `http://localhost:${PORT}`, '\x1b[0m');

});
    