const adminAuth = (req, res, next) => {
  console.log('Checking for admin auth');
  const token = 'xyz'
  const isAdminAuthorized = token === 'xyz'

  if(!isAdminAuthorized) {
    res.status(401).send('Unauthorized request')
  } else {
    next()
  }
}

const userAuth = (req, res, next) => {
  console.log('Checking for user auth');
  const token = 'xyz'
  const isAdminAuthorized = token === 'xyz'

  if(!isAdminAuthorized) {
    res.status(401).send('Unauthorized request')
  } else {
    next()
  }
}

module.exports = {
  adminAuth,
  userAuth
}