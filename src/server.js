import express from 'express';
import router from './router.js';
import handlebars from 'express-handlebars';

const app = express();
const PORT = 4000;

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.engine('hbs', handlebars.engine({
  layoutsDir: './src/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
}));

app.use('/', router);

app.listen(PORT, () => {
  console.log('servidor en puerto :', PORT);
});

