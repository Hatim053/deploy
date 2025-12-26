import mongoose from "mongoose"


const messageSchema = new mongoose.Schema({
   chatId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Chat'
   },
   senderId : {
    type : String,
    required : true,
   },
   message : {
   type : String,
   },
} , {timestamps : true,})


const Message = mongoose.model('Message' , messageSchema)

export default Message