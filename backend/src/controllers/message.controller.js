import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io} from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//await User.find({_id:{$ne: loggedInUserId}}).select("-password");
//This lines states that we are finding all the users who are not logged in  and we are selecting the password field


export const getMessages = async(req,res) => {
 try {
    const {id:userToChatId} = req.params
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
      ]
    }).populate("senderId", "-password").populate("receiverId", "-password");
    res.status(200).json(messages);
 } catch (error) {
    res.status(500).json({message: "Internal server error"});
    }
};

export const sendMessage = async(req,res) => {
    try {
       const {text,image} = req.body;
       const {id: receiverId} = req.params;
       const senderId = req.user._id;

       let imageUrl;
       if(image){
        //upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url;
       }

       const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
       });

       let newMssage = await newMessage.save();
       newMssage = await newMssage.populate("senderId", "-password");
       newMssage = await newMssage.populate("receiverId", "-password");

       //todo: send real time notification to the receiver using socket.io
       const receiverSocketId = getReceiverSocketId(receiverId);

       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMssage);
       }

       res.status(201).json(newMssage);

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
 };
