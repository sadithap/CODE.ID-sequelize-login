import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.departmentCtrl.findAll)
router.get('/:id',indexCtrl.departmentCtrl.findOne)
router.post('/',indexCtrl.departmentCtrl.create)
router.put('/:id',indexCtrl.departmentCtrl.update)
router.delete('/:id',indexCtrl.departmentCtrl.deleted)
router.get('/query/:id',indexCtrl.departmentCtrl.querySQL)

export default router