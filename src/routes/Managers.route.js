import { Router } from 'express';
import cookieParser from 'cookie-parser'
import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

import ManagerController from '../controller/Managers.controller.js';
const managerController = new ManagerController();

// 1. 회원가입 POST : localhost:3000/api/manager/signupd
router.post('/signup', managerController.signup)

// 2. 로그인 POST : localhost:3000/api/manager/login
router.post('/login', managerController.login)

// 3. 로그아웃 POST : localhost:3000/api/manager/logout
router.post('/logout', managerController.logout)

// 4. 회원정보 조회 GET : localhost:3000/api/manager/:ManagerId
router.get('/:ManagerId', authmiddleware, managerController.info)

// 5. 회원정보 수정 (비밀번호만 수정 가능) PATCH : localhost:3000/api/manager/:ManagerId
router.patch('/:ManagerId', authmiddleware, managerController.edit)

// 6. 회원정보 삭제 DELETE : localhost:3000/api/manager/:ManagerId
router.delete('/:ManagerId', authmiddleware, managerController.remove)




export default router;


