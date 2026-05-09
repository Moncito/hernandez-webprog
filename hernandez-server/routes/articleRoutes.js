const express = require('express');
const { getArticles, createArticle, updateArticle, deleteArticle, getArticleBySlug } = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/:id').put(updateArticle).delete(deleteArticle);
router.route('/slug/:slug').get(getArticleBySlug);

module.exports = router;
