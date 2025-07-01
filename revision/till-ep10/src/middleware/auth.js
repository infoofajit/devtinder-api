const userAuth = (req, res, next) => {
  const token = 'xyz'

  const isAuth = token === 'xyz'

  if(!isAuth) {
    res.status(401).send("Invalid token")
  } else {
    next()
  }
}

module.exports = {
  userAuth
}