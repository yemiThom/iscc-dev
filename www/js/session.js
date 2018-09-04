/**
 * Function to get a valid current user session from localstorage.
 */
function getSession() {
  User || (User = UserPool.getCurrentUser());
  return new Promise(function(resolve, reject) {
    if (User === null) {
      reject('No current session found.');
      return;
    }
    User.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      if (session.isValid() === false){
        reject('Session is invalid');
      }
      resolve();
      return;
    })
  })
}
/**
 * Alias to improve the API.
 */
function isAuthenticated() {
  return getSession();
}
/**
 * Alias function that turn around the getSesion result to improve the API.
 */
function isNotAuthenticated() {
  return new Promise(function(resolve, reject) {
    getSession().then(reject).catch(resolve);
  })
}
/**
 * Gets the user attributes from the user.
 */
function getUser() {
  return (
    getSession()
    .then(function() {
      // NOTE: getSession must be called to authenticate user before 
      // calling getUserAttributes
      return new Promise(function(resolve, reject) {
        User.getUserAttributes(function(err, attributes) {
          if (err) {
            reject(err);
            return
          }
          // Reduce the attributes into a simpler object.
          resolve(attributes.reduce(function (acc, attr) {
            var attribute = {};
            attribute[attr.getName()] = attr.getValue();
            return Object.assign(acc, attribute);
          }, {}));
          return;
        });
      })
    })
  )
}