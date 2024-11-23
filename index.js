import express from 'express';
import mainRoutes from './Server/routes/main.js';
import expressEjsLayouts from 'express-ejs-layouts';
import connectDB from './Server/config/db.js';

const app = express();

// Database Connection

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.use('/', mainRoutes);

app.listen(3000, () => {
  console.log(`Server Running on the PORT 3000`);
});
