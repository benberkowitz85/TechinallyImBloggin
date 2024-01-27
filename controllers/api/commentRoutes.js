const express = require('express');
const router = express.Router();
const { Comments } = require('../../models')
const withAuth = require('../../utils/auth')

//create comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });


    res.status(200).json(newComment);
  } catch (err) {

    res.status(500).json(err);
  }
});
  
  module.exports = router;