import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'


passport.use(new GoogleStrategy({
    clientID: 'your_client_id',
    clientSecret: 'your_client_secret',
    callbackURL: 'http://localhost:3000/auth/google/callback' // Change this URL according to your setup
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
    console.log(profile);

    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    console.log('Serialized user');
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log('Deserialized user');
    done(null, null);
})
