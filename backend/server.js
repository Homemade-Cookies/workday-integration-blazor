const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const { errorHandler, logErrors } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/workday-integration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Session setup
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/items', itemRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
