import { Router } from "express";
import passport from "passport";


const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout(err => console.error(err));
  return res.status(200)
})

export default router
