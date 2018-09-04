/**
 * Cognito signOut function wrapped inside a promise.
 */
function signOut() {
  User || (User = UserPool.getCurrentUser())
  if (!User) {
    return Promise.reject('Current user session not found');
  }
  return Promise.resolve(User.signOut());
}
/**
 * Function that handles the signOut event. It set's the navigation inside a
 * setTimeout function so we can see the process working on this example.
 * Clearly it is not necessary to do so.
 */
function handleSignOut(event) {
  event.preventDefault();
  Cognito.signOut()
  .then(function() {
    addAlert({
      type: 'success',
      message: 'Logging out. Please wait...'
    })
    setTimeout(function() {
      EventEmitter.emit('Welcome:unmount');
      EventEmitter.emit('LoginForm:mount');
    }, 3000)
  })
  .catch(function(error) {
    addAlert({
      type: 'error',
      message: error.message,
    })
    console.error(error);
  })
}