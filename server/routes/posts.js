const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all published posts (public)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ status: 'published' });
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});

// Get single post by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ 
      slug: req.params.slug,
      status: 'published' 
    }).populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    console.error('Get single post error:', error);
    res.status(500).json({ message: 'Server error while fetching post' });
  }
});

// Admin routes (require authentication)

// Get all posts for admin (including drafts)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || 'all';

    let filter = {};
    if (status !== 'all') {
      filter.status = status;
    }

    const posts = await Post.find(filter)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});

// Create new post (admin only)
router.post('/', [
  adminAuth,
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, status, tags, featured } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      author: req.user._id,
      status: status || 'published',
      tags: tags || [],
      featured: featured || false
    });

    await post.save();
    await post.populate('author', 'username');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error while creating post' });
  }
});

// Update post (admin only)
router.put('/:id', [
  adminAuth,
  body('title').optional().notEmpty().trim().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { title, content, excerpt, status, tags, featured } = req.body;

    // Update fields if provided
    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (status) post.status = status;
    if (tags !== undefined) post.tags = tags;
    if (featured !== undefined) post.featured = featured;

    await post.save();
    await post.populate('author', 'username');

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error while updating post' });
  }
});

// Delete post (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
});

// Get single post by ID (admin)
router.get('/admin/:id', adminAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get admin post error:', error);
    res.status(500).json({ message: 'Server error while fetching post' });
  }
});

module.exports = router;