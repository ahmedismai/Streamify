import { Router } from 'express';
import { acceptFriendRequest, getAllUsers, getFriendRequest, getMyFriends, getOutGoingFriendReqs, rejectFriendRequest, sendFriendRequest } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = Router()

//apply all auth middleware to all routes
router.use(protectedRoute)

router.get("/" ,getAllUsers)
router.get("/friends" , getMyFriends)

router.post("/friend-request/:id" , sendFriendRequest)
router.put("/friend-request/:id/accept" , acceptFriendRequest)
router.put("/friend-request/:id/rejected" , rejectFriendRequest)

router.get("/friend-request" , getFriendRequest)
router.get("/outgoing-friend-requests" , getOutGoingFriendReqs)

export default router
