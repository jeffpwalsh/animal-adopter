const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// // @route    GET api/profile/me
// // @desc     Get current users profile
// // @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route    POST api/profile
// // @desc     Create or update user profile
// // @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('characteristics', 'Characteristics is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      nickname,
    
      location,
      age,
      bio,
      characteristics,
      status
    
   
      
   
     
    } = req.body;

    const profileFields = {
      user: req.user.id,
    
      nickname,
      location,
      age,
      bio,
      characteristics: Array.isArray(characteristics)
        ? characteristics
        : characteristics.split(',').map((skill) => ' ' + skill.trim()),
      status,
    };

    // Build social object and add to profileFields
    const socialfields = { };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate('user', ['name']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/Info
// @desc     Add profile Info
// @access   Private
router.put(
  '/Info',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('nickname', 'Nickname is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      nickname,
     
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      nickname,
     
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.Info.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/Info/:exp_id
// @desc     Delete Info from profile
// @access   Private

router.delete('/Info/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.Info = foundProfile.Info.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// // @route    PUT api/profile/education
// // @desc     Add profile education
// // @access   Private
// router.put(
//   '/education',
//   [
//     auth,
//     [
//       check('school', 'School is required').not().isEmpty(),
//       check('degree', 'Degree is required').not().isEmpty(),
//       check('fieldofstudy', 'Field of study is required').not().isEmpty(),
//       check('from', 'From date is required and needs to be from the past')
//         .not()
//         .isEmpty()
//         .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description,
//     } = req.body;

//     const newEdu = {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description,
//     };

//     try {
//       const profile = await Profile.findOne({ user: req.user.id });

//       profile.education.unshift(newEdu);

//       await profile.save();

//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    DELETE api/profile/education/:edu_id
// // @desc     Delete education from profile
// // @access   Private

// router.delete('/education/:edu_id', auth, async (req, res) => {
//   try {
//     const foundProfile = await Profile.findOne({ user: req.user.id });
//     foundProfile.education = foundProfile.education.filter(
//       (edu) => edu._id.toString() !== req.params.edu_id
//     );
//     await foundProfile.save();
//     return res.status(200).json(foundProfile);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// });

// // @route    GET api/profile/github/:username
// // @desc     Get user repos from Github
// // @access   Public
// router.get('/github/:username', async (req, res) => {
//   try {
//     const uri = encodeURI(
//       `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
//     );
//     const headers = {
//       'user-agent': 'node.js',
//       Authorization: `token ${config.get('githubToken')}`,
//     };

//     const gitHubResponse = await axios.get(uri, { headers });
//     return res.json(gitHubResponse.data);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(404).json({ msg: 'No Github profile found' });
//   }
// });

module.exports = router;