const express = require('express');
const usersRoute = require('./routes/usersRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const blogPostsRoute = require('./routes/blogPostsRoute');

const app = express();

app.use(express.json());
app.use(usersRoute);
app.use(categoriesRoute);
app.use(blogPostsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
