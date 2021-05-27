const joi = require('joi');
const { BlogPost, PostsCategorie, Categorie } = require('../models');
const InvalidEntries = require('../customErrors/invalidEntries');

const schemaCreatePost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
  userId: joi.number().required(),
});

const validateInputs = (inputs, schema) => {
  console.log(inputs.userId);

  const { error } = schema.validate(inputs);
  if (error) {
    const { details: [{ message }] } = error;
    throw new InvalidEntries(message, 400);
  }
};

const categoryExist = async (categories) => {
  const countResultCategories = await Categorie.count({
    where: { id: categories },
  });
  if (countResultCategories !== categories.length) {
    throw new InvalidEntries('"categoryIds" not found', 400);
  }
};

const createBlogPost = async (title, content, categoryIds, userId) => {
  validateInputs({ title, content, categoryIds, userId }, schemaCreatePost);
  const post = await BlogPost.create({ title, content, userId });
  await categoryExist(categoryIds);
  await PostsCategorie.bulkCreate(
    [...categoryIds.map((category) => ({ postId: post.id, categoryId: category }))],
  );
  return post;
};

const getAllPosts = async () => BlogPost.findAll({
  include: [
      { association: 'user' },
      { association: 'categories', through: { attributes: [] } },
    ],
});

// const getUserById = async (id) => {
//   const user = await User.findOne({ where: { id } });
//   if (!user) throw new InvalidEntries('User does not exist', 404);

//   return user;
// };

module.exports = {
  createBlogPost,
  getAllPosts,
  // getUserById,
};