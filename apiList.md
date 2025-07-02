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
- POST /request/send/status<interested | ignored>:userId
- POST /request/review/status<accepted | rejected>:requestId

## userRouter
- POST /user/requests/received
- POST /user/connection
- POST /user/feed - Gets the profile of other users on platform

Status: ignore, interested, accepted, rejected