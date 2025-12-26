import mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Seller',
        // required : true,
    },
    status : {
        type : String,
        required : true,
        enum : ['success' , 'pending' , 'failed'],
    },
    mode : {
        type : String,
        enum : ['UPI'],
        required : true,
        default : 'UPI',
    },
    amount : {
        type : Number,
        required : true,
    },
    currency : {
        type : String,
        enum : ['INR'],
        default : 'INR',
    },
    paymentId : {
        type : String,
        default : null,
    },
    transactionDate : {
        type : Date,
        default : (new Date).toLocaleDateString,
    }
} , {timestamps : true,})


const Payment = mongoose.model('Payment' , paymentSchema)

export default Payment