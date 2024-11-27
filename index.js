import express from 'express';
import mainRoutes from './Server/routes/main.js';
import adminRoutes from './Server/routes/admin.js';
import expressEjsLayouts from 'express-ejs-layouts';
import connectDB from './Server/config/db.js';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

const app = express();

// Database Connection

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.use('/', mainRoutes);
app.use('/', adminRoutes);

app.listen(3000, () => {
  console.log(`Server Running on the PORT 3000`);
});
