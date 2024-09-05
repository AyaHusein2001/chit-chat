const  mongoose  = require("mongoose");

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        defauault:""
    },
    imageURL:{
        type: String,
        defauault:""
    },
    videoURL:{
        type: String,
        defauault:""
    },
    seen:{
        type: Boolean,
        defauault:false
    },
},{timestamps:true})
// ref:'User' , this is because sender , reciever will reference user table
// timestamps will be added after created and updated
const conversationSchema= new mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    reciever:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'User'

    },
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "Message"
        }
    ]
},{
    timestamps: true
})
const messaageModel = mongoose.model('Message',messageSchema)
const conversationModel = mongoose.model("Conversation",conversationSchema)

module.exports={
    messaageModel,
    conversationModel
}