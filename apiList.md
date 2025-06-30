# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/sent/interested:userId
- POST /request/sent/ignored:userId
- POST /request/review/accepted:requestId
- POST /request/review/rejected:requestId

## userRouter
- POST /user/connection
- POST /user/requests/received
- POST /user/feed - Gets the profile of other users on platform

Status: ignore, interested, accepted, rejected