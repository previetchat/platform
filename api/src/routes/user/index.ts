import { Router } from 'express'
import { guard } from '../../middlewares/guard'
import * as controllers from './user.controllers'

const router = Router()

router.post('/register', controllers.register) 
router.post('/login', controllers.login)
router.post('/invite/:email', guard, controllers.invite)
router.post('/accept/:id', guard, controllers.acceptInvite) 
router.get('/invites', guard, controllers.getInvites)
router.get('/friends', guard, controllers.getFriends)
router.get('/user/:id', guard, controllers.getUser)
router.delete('/decline/:id', guard, controllers.declineInvite)

export default router