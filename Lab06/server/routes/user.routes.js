import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/userPlants/')
  .get(authCtrl.requireSignin, authCtrl.isMuggle, userCtrl.list)
  .post(userCtrl.create)


router.route('/api/userPlants/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/userPlants/admin/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.isMuggle, userCtrl.list)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization,  authCtrl.isMuggle, userCtrl.update)



router.param('userId', userCtrl.userByID)

export default router

