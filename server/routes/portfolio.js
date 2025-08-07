const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Portfolio = require('../models/Portfolio');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = 'uploads/portfolio';
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Validation rules
const portfolioValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('category')
    .isIn(['video', 'design'])
    .withMessage('Category must be either video or design'),
  body('link')
    .isURL()
    .withMessage('Please provide a valid URL'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a positive integer')
];

// GET /api/portfolio - Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const featured = req.query.featured;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true };
    if (category && ['video', 'design'].includes(category)) {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const portfolioItems = await Portfolio.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Portfolio.countDocuments(query);

    res.json({
      success: true,
      data: {
        items: portfolioItems,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio items'
    });
  }
});

// GET /api/portfolio/:id - Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem || !portfolioItem.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Increment views
    portfolioItem.views += 1;
    await portfolioItem.save();

    res.json({
      success: true,
      data: portfolioItem
    });

  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio item'
    });
  }
});

// POST /api/portfolio - Create new portfolio item (admin only)
router.post('/', authenticate, authorize(['admin']), upload.single('thumbnail'), portfolioValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, category, link, tags, featured, order } = req.body;

    // Handle thumbnail
    let thumbnail = req.body.thumbnail; // URL from request body
    if (req.file) {
      thumbnail = `/uploads/portfolio/${req.file.filename}`;
    }

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: 'Thumbnail is required (either upload file or provide URL)'
      });
    }

    const portfolioItem = new Portfolio({
      title,
      description,
      category,
      thumbnail,
      link,
      tags: tags ? JSON.parse(tags) : [],
      featured: featured === 'true',
      order: order ? parseInt(order) : 0
    });

    await portfolioItem.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolioItem
    });

  } catch (error) {
    console.error('Create portfolio error:', error);
    // Clean up uploaded file on error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create portfolio item'
    });
  }
});

// PUT /api/portfolio/:id - Update portfolio item (admin only)
router.put('/:id', authenticate, authorize(['admin']), upload.single('thumbnail'), portfolioValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, category, link, tags, featured, order } = req.body;

    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Handle thumbnail update
    let thumbnail = portfolioItem.thumbnail;
    if (req.file) {
      // Delete old thumbnail if it's a local file
      if (portfolioItem.thumbnail.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), portfolioItem.thumbnail);
        await fs.unlink(oldPath).catch(console.error);
      }
      thumbnail = `/uploads/portfolio/${req.file.filename}`;
    } else if (req.body.thumbnail) {
      thumbnail = req.body.thumbnail;
    }

    // Update fields
    portfolioItem.title = title;
    portfolioItem.description = description;
    portfolioItem.category = category;
    portfolioItem.thumbnail = thumbnail;
    portfolioItem.link = link;
    portfolioItem.tags = tags ? JSON.parse(tags) : portfolioItem.tags;
    portfolioItem.featured = featured === 'true';
    portfolioItem.order = order ? parseInt(order) : portfolioItem.order;

    await portfolioItem.save();

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolioItem
    });

  } catch (error) {
    console.error('Update portfolio error:', error);
    // Clean up uploaded file on error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update portfolio item'
    });
  }
});

// DELETE /api/portfolio/:id - Delete portfolio item (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Delete thumbnail file if it's local
    if (portfolioItem.thumbnail.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), portfolioItem.thumbnail);
      await fs.unlink(filePath).catch(console.error);
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });

  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete portfolio item'
    });
  }
});

// POST /api/portfolio/:id/like - Like portfolio item
router.post('/:id/like', async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem || !portfolioItem.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    portfolioItem.likes += 1;
    await portfolioItem.save();

    res.json({
      success: true,
      message: 'Portfolio item liked',
      data: { likes: portfolioItem.likes }
    });

  } catch (error) {
    console.error('Like portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like portfolio item'
    });
  }
});

module.exports = router;