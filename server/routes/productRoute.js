import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import middleware from "../middleware/upload"

const router = Router()

router.get('/',indexCtrl.productCtrl.findAll)
router.get('/category',indexCtrl.productCtrl.findByCategory)
router.post('/add',middleware.upload,indexCtrl.productCtrl.create)

export default router