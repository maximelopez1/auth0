const express = require('express');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const app = express();
app.use(cors());

const checkJwt = auth({
  audience: 'https://test-node-api',
  issuerBaseURL: 'https://dev-qynmvbzcwudsqfft.us.auth0.com/',
});

// Routes
app.get('/api/public', function(req, res) {
    res.json({ message: "Hello from a public endpoint!" });
});

app.get('/api/private', checkJwt, function(req, res) {
    res.json({ message: "Hello from a private endpoint!" });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
    res.json({ message: "Hello from a private endpoint with scope!" });
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
