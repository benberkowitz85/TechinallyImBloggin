const router = require('express').Router();
const { Blog, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and Join to user
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // convert data for handlebars template
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // Pass converted data and token into template
    res.render('home', {
        blogs,
        logged_in: req.session.logged_in
    });
  } catch (err) {
    
    res.status(523).json(err);
  }
});


//get blog by user id 
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model:Comments,
          include:[
            {
              model:User,
              attributes:['name'],
            },
          ],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blogview', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
router.get('/blog', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
   

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    
    res.status(500).json(err);
  }
});

//update blog
router.get('/update/:blogId', withAuth, async (req, res) => {
  try {
    // get individual blog
    const blogData = await Blog.findByPk(req.params.blogId, {
      //include user data (IE: what user created the blog)
      include: [{ model: User, attributes: ['name'] }], 
    });


    if (blogData) {
      // convert data for template
      const blog = blogData.get({ plain: true });

      // create edit page
      res.render('update', { 
        blog,
        logged_in: req.session.logged_in 
      });
    } else {
      // If the item is not found, send a 404 response
      res.status(404).send('blog not found');
    }
  } catch (err) {
    // Handle any errors with a 500 response
    res.status(500).json(err);
  }
});
//comment form
router.get('/comments/:blogId', withAuth, async (req, res) => {
  try {
    //get blog by id
    const blogData = await Blog.findByPk(req.params.blogId);

  
    if (blogData) {
      // convert blog into template format
      const blog = blogData.get({ plain: true });

      // display blog and comment form
      res.render('comments', { blog, logged_in: req.session.logged_in });
    } else {
      // If the blog is not found, send a 404 response
      res.status(404).send('Blog not found');
    }
  } catch (err) {
    // Handle any errors with a 500 response
    res.status(500).json(err);
  }
});

//login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to dash
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});



module.exports = router;