import { Router } from 'express'
import { guard } from '../../middlewares/guard'
import * as controllers from './message.controllers'

const router = Router()
router.post('/', guard, controllers.send)
router.get('/:id', guard, controllers.getMessages)

export default router
