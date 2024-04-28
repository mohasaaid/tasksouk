const express = require('express');
const {createConnection} = require('typeorm');
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'lHf3Do5yPgQiAzdxSEQznWON7QvfNqkz',
    issuerBaseURL: 'https://dev-z6za83yyvnvm0m2d.eu.auth0.com',
    secret: 'LONG_RANDOM_STRING'
  };


app.use(express.json());
// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));


// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(
      req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
  });

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });

  
createConnection().then(connection => {
    // Assuming you might have routes defined elsewhere
    const categoryRoutes = require('./routes/categoryRoutes');
    const freelancerRoutes = require('./routes/freelancerRoutes');
    const serviceOfferRoutes = require('./routes/serviceOfferRoutes');
    const reviewsRoutes = require('./routes/reviewRoutes');
    const serviceRequestRoutes = require('./routes/serviceRequestRoutes');

    app.use('/categories', categoryRoutes);
    app.use('/freelancers', freelancerRoutes);
    app.use('/serviceoffers', serviceOfferRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('/servicerequests', serviceRequestRoutes);
    

    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(error => console.error('Error connecting to the database', error));


