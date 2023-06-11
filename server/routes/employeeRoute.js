import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.employeeCtrl.findAll)
router.get('/:id',indexCtrl.employeeCtrl.findOne)
router.post('/',indexCtrl.employeeCtrl.create)
router.put('/:id',indexCtrl.employeeCtrl.update)
router.delete('/:id',indexCtrl.employeeCtrl.deleted)
router.get('/query/:id',indexCtrl.employeeCtrl.querySQL)

export default router