import { Router } from 'express';
import cookieParser from 'cookie-parser'
import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

import ManagerController from '../controller/Managers.controller.js';
const managerController = new ManagerController();

// 1. 회원가입
router.post('/signup', managerController.signup)

// 2. 로그인
router.post('/login', managerController.login)

// 3. 로그아웃
router.post('/logout', managerController.logout)

// 4. 회원정보 조회
router.get('/:customerId', authmiddleware, managerController.info)

// 5. 회원정보 수정 (비밀번호만 수정 가능)
router.patch('/:customerId', authmiddleware, managerController.edit)

// 6. 회원정보 삭제
router.delete('/:customerId', authmiddleware, managerController.remove)




export default router;


