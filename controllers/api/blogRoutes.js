const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one blog by id
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('update', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//post to the homepage
router.post("/", async (req, res) => {
  const { heading, content} = req.body;

  try {
    const blogData = await Blog.create({
      heading,
      content,
      user_id: req.session.user_id,
    });

    res.status(200).json(blogData);
  } catch (err) {

    res.status(400).json(err);
  }
});

//delete blog by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json({message: 'Blog has been deleted'});
  } catch (err) {
    console.log(err)
    res.status(500).json("Could not find blog");
  }
});

//update blog
router.put('/:id', async (req, res) => {
  const blog_id = req.params.id;
  const { heading, content } = req.body;

  try {
    const [rowsAffected] = await Blog.update(
      { heading, content },
      { where: { id: blog_id } }
    );

    if (rowsAffected === 0) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Blog has been updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not update blog' });
  }
});




module.exports = router;