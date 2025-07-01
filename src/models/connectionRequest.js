const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {type: mongoose.Schema.Types.ObjectId, require: true},
  toUserId: {type: mongoose.Schema.Types.ObjectId, require: true},
  status: {type: String, required: true, enum: {
    values: ["ignored", "interested", "accepted", "rejected"],
    message: `{VALUE} is incorrect`
  }}
}, {timestamps: true})

// Compound index
connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

connectionRequestSchema.pre('save', function(next) {
  const connectionRequest = this
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send connection request to yourself")
  }
  next()
})

const ConnectionRequestModal = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModal