const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

const failLoginAttempts = {};
const maxFailedAttempts = 5;
const lockDuration = 30 * 60 * 1000;
/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.

 

  if (user && passwordChecked) {
    resetFailedAttempts(email);
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  }

  if (!failLoginAttempts[email]) {
    failLoginAttempts[email] = { count: 0, lastAttempt: 0 };
  }

const remainingTime = calculateResetTime(email);
  if (remainingTime > 0) {
    const countdown = Math.floor(remainingTime / 1000);
    throw errorResponder(
      errorTypes.FORBIDDEN,
      `Akun Anda diblokir selama ${countdown} detik.`
    );
  }


  failLoginAttempts[email].count++;
  failLoginAttempts[email].lastAttempt = Date.now();
  const failedAttempts = failLoginAttempts[email].count;

  if (failedAttempts >= maxFailedAttempts) {
    failLoginAttempts[email].lastAttempt = Date.now() + lockDuration;
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Wrong email or password'
    );
  }
/**
* @param {string} email 
* @returns {number} 
*/
function calculateResetTime(email) {
  const elapsedTime = failLoginAttempts[email].lastAttempt - Date.now();
  return Math.max(elapsedTime, 0);
}
function resetFailedAttempts(email) {
  failLoginAttempts[email] = { count: 0, lastAttempt: 0 };
}
}

module.exports = {
  checkLoginCredentials,
};
