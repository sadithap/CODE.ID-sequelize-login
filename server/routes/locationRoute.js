import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.locationCtrl.findAll)
router.get('/:id',indexCtrl.locationCtrl.findOne)
router.post('/',indexCtrl.locationCtrl.create)
router.put('/:id',indexCtrl.locationCtrl.update)
router.delete('/:id',indexCtrl.locationCtrl.deleted)
router.get('/query/:id',indexCtrl.locationCtrl.querySQL)

export default router