const { Router } = require('express');
const authController = require('../authControllers');
const router = Router();

router.post('/signup', authController.signup)
router.post('/createBlog', authController.createBlog)

router.get('/getBlog', authController.getBlog)
router.delete('/delete/:id', authController.deleteBlog)
router.put('/update/:id', authController.updateBlog)

router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/verifyuser', authController.verifyuser)

module.exports = router;