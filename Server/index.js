import 'dotenv/config'
import server from './app.js'
import {Server} from 'socket.io'
import connectDb from './src/db/index.js'
import { disconnect } from 'mongoose'
import Chat from './src/models/Chat.model.js'
import Message from './src/models/message.model.js'
import User from './src/models/user.model.js'
import Seller from './src/models/seller.model.js'


const port = process.env.PORT


// socket logic part
const io = new Server(server , {
    cors : {
        origin : `${process.env.CLIENT_SIDE_URL}`,
        methods : ['GET' , 'POST'],
        credentials : true,
    }
})

let onlineUsers = [] // for storing users ki databaseId aur socketId in key value pair

io.on('connection' , (socket) => {
console.log(onlineUsers , 'socket users')
 // When a user sends a message
socket.on('registerUser' , (userId) => {
    onlineUsers[userId] = socket.id
    console.log(onlineUsers)
})


socket.on('sendMessage' , async( {senderId , receiverId , currentUserType , message} ) => {
console.log(onlineUsers)
    let existingChat = await Chat.findOne({ // checking if both users and sellers had any chats before
        participants : { $all : [senderId , receiverId] }
    }) 
     console.log(existingChat)

    if(! existingChat) { // means koi chats nhi h to creating new one

        // find username's of both the participants
        console.log(`${currentUserType[0].toUpperCase()}${currentUserType.substring(1)}`)
        let sender = await Seller.findById(senderId)
        if(! sender) {
            sender = await User.findById(senderId)
        }
        let receiver = await Seller.findById(receiverId)
        if( ! receiver) { // means reciever is not seller
         receiver = await User.findById(receiverId)
        }
        existingChat = await Chat.create({
            participants : [senderId , receiverId],
            person1 : sender?.username,
            person2 : receiver?.username,

        })
    }

        const newMessage = await Message.create({ // creating document of the message 
            chatId : existingChat._id,
            senderId,
            message,
        })
console.log(newMessage)

        const revceiverSocketId = onlineUsers[receiverId]
       
        if(revceiverSocketId) { // means [receiver] online he so emitting message to him
        io.to(revceiverSocketId).emit('receiveMessage' , {
            chatId : existingChat._id,
            senderId,
            message
        })
        }

})



    io.on('disconnect' , () => {
        console.log('user disconnected')
    })
})







// listening on port and data base connection
connectDb(process.env.MONGODB_URL).then((res) => {
    server.listen(port , () => {
        console.log(`server is running on port ${port}`)
    })
})

