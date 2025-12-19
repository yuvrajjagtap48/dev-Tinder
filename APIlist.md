# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout


## profileRouter
- GET /profile/view
- PATCH /profile/edit 
- PATCH /profile/password            //forgot password API


## conncetionRequestRouter
- POST /request/send/:status/:userId  =>  (Status : ignore, intersted, accepeted, rejected)
- POST /request/review/:status/:requestId  => (status: accepted,rejected)


## userRouter
-GET /user/connections
-GET /user/requests/received
-GEt /user/feed  - Gets you the profiles of other users on platform 

