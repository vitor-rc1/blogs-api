const joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, PostsCategorie, Categorie } = require('../models');
const InvalidEntries = require('../customErrors/invalidEntries');

const schemaCreatePost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
  userId: joi.number().required(),
});

const schemaEditPost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
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

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
        { association: 'user' },
        { association: 'categories', through: { attributes: [] } },
      ],
  });
  if (!post) {
    throw new InvalidEntries('Post does not exist', 404);
  }

  return post;
};

const editBlogPostById = async (title, content, categoryIds, id) => {
  if (categoryIds) {
    throw new InvalidEntries('Categories cannot be edited', 400);
  }
  validateInputs({ title, content }, schemaEditPost);
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  return BlogPost.findByPk(id, {
    include: {
      association: 'categories', through: { attributes: [] },
    },
  });
};

const deleteBlogPostById = async (id) => BlogPost.destroy({ where: { id } });

// Referencia para a solu????o abaixo
// https://stackoverflow.com/questions/34255792/sequelize-how-to-search-multiple-columns/34263873
const searchTermInPosts = async (searchTerm) => BlogPost.findAll({
  where: {
    [Op.or]: [
     { title: { [Op.like]: `%${searchTerm}%` } },
     { content: { [Op.like]: `%${searchTerm}%` } },
    ],
  },
  include: [
    { association: 'user' },
    { association: 'categories', through: { attributes: [] } },
  ],
});

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
  editBlogPostById,
  deleteBlogPostById,
  searchTermInPosts,
};