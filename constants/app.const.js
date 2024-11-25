// mongo DB
const MONGO_DB_CONNECTED = 'MongoDB connected';
const MONGO_DB_CONNECTED_ERROR = 'MongoDB connection error:';

// server
const SERVER_RUNNING_MESSAGE = 'Server is running on port';

// port number
const PORT = process.env.PORT || 5000;

// error messages
const USER_NOT_FOUND = 'User not found';
const INVALID_CREDENTIALS = 'Invalid credentials';

// session time
const ONE_HOUR = '1h';

// success messages
const PASSWORD_UPDATE_SUCCESSFULLY = 'Password updated successfully';

// error message
const USER_DATA_ERROR_MESSAGE = 'Failed to fetch user data!'

// urls
const LOGIN_URL = '/login';
const SIGNUP_URL = '/signup';
const FORGOT_PASSWORD_URL = '/forgot-password';
const USERS_DATA_URL = '/users';

// route url
const API_AUTH_URL = '/api/auth';
const API_DATA_URL = '/api/data';

module.exports = {
    
    API_AUTH_URL,
    API_DATA_URL,
    MONGO_DB_CONNECTED,
    MONGO_DB_CONNECTED_ERROR,
    SERVER_RUNNING_MESSAGE,
    PORT,
    USER_NOT_FOUND,
    INVALID_CREDENTIALS,
    ONE_HOUR,
    PASSWORD_UPDATE_SUCCESSFULLY,
    LOGIN_URL,
    SIGNUP_URL,
    FORGOT_PASSWORD_URL,
    USERS_DATA_URL,
    USER_DATA_ERROR_MESSAGE,

}