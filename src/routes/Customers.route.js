import { Router } from 'express';
import cookieParser from 'cookie-parser'
// import authmiddleware from '../middlewares/middleware.js'

const router = Router();
router.use(cookieParser());

import CustomerController from '../controller/Customers.controller.js';
const customerController = new CustomerController();

// 1. 회원가입
router.post('/signup', customerController.signup)

// 2. 로그인
router.post('/login', customerController.login)

// 3. 로그아웃
router.post('/logout', customerController.logout)

// 4. 회원정보 조회
router.get('/:customerId', customerController.info)

// 5. 회원정보 수정 (비밀번호만 수정 가능)
router.patch('/:customerId', customerController.edit)

// 6. 회원정보 삭제
router.delete('/:customerId', customerController.remove)




export default router;


