import User from './../models/User.js';
import FriendRequest from './../models/FriendRequest.js';

export async function getAllUsers(req, res){
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers =await User.find({
            $and:[
                {_id:{$ne: currentUserId}},
                {_id:{$nin: currentUser.friends}},
                {isOnBoarded: true}
            ]
        });
        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.error("Error in getAllUsers controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function getMyFriends(req, res){
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","name profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends)
    } catch (error) {
        console.error("Error to getMyFriends controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId = req.user.id;
        const {id} = req.params;
        if(myId === id){
            return res.status(400).json({message:"You can`t send request to yourself"})
        }
        const recipient= await User.findById(id)
        if(!recipient){
            return res.status(404).json({message:"Recipient not found"})
        }
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"})
        }
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:myId , recipient:id},
                {sender:id, recipient:myId }
            ]
        });
        if(existingRequest){
            return res.status(400).json({message:"A friend request already exists between you and this user "})
        }
        const friendRequest = await FriendRequest.create({
            sender:myId,
            recipient:id
        })
        console.log("Created friend request ID:", friendRequest._id);
        res.status(200).json(friendRequest)
    } catch (error) {
        console.error("Error to sendFriendRequest controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function acceptFriendRequest(req,res){
    try {
        const {id} = req.params;
        const friendRequest = await FriendRequest.findById(id);
        console.log(friendRequest)
        if(!friendRequest){
            return res.status(404).json({message:"Friend request not found"})
        }
        if (friendRequest.recipient.toString() !== req.user.id.toString()) {
            return res.status(403).json({message:"You are not authorized to accept this request"})
        }
        friendRequest.status="accepted"
        await friendRequest.save()

        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient}
        })
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends:friendRequest.sender}
        })
        res.status(200).json({message:"Friend request accepted "})
    } catch (error) {
        console.error("Error to acceptFriendRequest controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function rejectFriendRequest(req, res) {
    try {
        const { id } = req.params;
        const friendRequest = await FriendRequest.findById(id);

    if (!friendRequest) {
        return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "You are not authorized to reject this request" });
    }

        friendRequest.status = "rejected";
        await friendRequest.save();

        res.status(200).json({ message: "Friend request rejected" });
    } catch (error) {
        console.error("Error in rejectFriendRequest controller:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
  

export async function getFriendRequest(req, res){
    try {
        const inComingReqs = await FriendRequest.find({recipient:req.user.id , status:"pending"})
        .populate("sender", "name profilePic nativeLanguage learningLanguage")
        const acceptedReqs = await FriendRequest.find({sender:req.user.id , status:"accepted"})
        .populate("recipient", "name profilePic")
        res.status(200).json({inComingReqs , acceptedReqs})
    } catch (error) {
        console.error("Error to getFriendRequest controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}
export async function getOutGoingFriendReqs(req, res){
    try {
        const outGoingReqs = await FriendRequest.find({sender:req.user.id , status:"pending"})
        .populate("recipient", "name:fullName profilePic nativeLanguage learningLanguage")
        res.status(200).json({outGoingReqs})
    } catch (error) {
        console.error("Error to getOutGoingFriendReqs controller",error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}