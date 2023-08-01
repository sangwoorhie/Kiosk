// import Message from './message.service.js';
// import ManagerRepository from '../repositories/Managers.repository.js'
// import bcrypt from 'bcrypt';
// import JWT from 'jsonwebtoken';
// import { JWT_KEY, secretKey, reSecretKey } from '../constants.js'

// // message 파일
// const sign = new Message('회원가입')

// class ManagerService {
//     managerRepository = new ManagerRepository();

//     // 1. 회원가입
//     signup = async (email, password, confirm) => {
//         const E = new Message('이메일')
//         const pw = new Message('비밀번호')
//         const cfpw = new Message('확인 비밀번호')

//     try{
//         // 유효성 검사
//             if(!email){
//                 return E.undefined();
//             } else if (!password){
//                 return pw.undefined();
//             } else if (!confirm){
//                 return cfpw.undefined();
//             } else if (password !== confirm){
//                 return {
//                     status: 400,
//                     message: "비밀번호가 확인 비밀번호와 일치하지 않습니다."
//                 }
//             }

//         // 이메일, 패스워드 정규식
//         const Emailcheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//         const pwcheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;  // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)

//             if(!Emailcheck.test(email)){
//                 return {
//                     status: 412,
//                     message: "이메일 형식이 올바르지 않습니다."
//                 }
//             } else if (!pwcheck.test(password)){
//                 return {
//                     status: 412,
//                     message: "비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다."
//                 }
//             }

//         // 중복 검사
//         const existCustomer = await this.managerRepository.findbyEmail(email)
//             if(existCustomer && existCustomer.email == email){
//                 return {
//                     status: 409,
//                     message: "동일한 이메일이 이미 존재합니다."
//                 }
//             }

//          // 비밀번호 hash로 암호화저장 + 토큰발급
//          const saltRound = 10;
//          const salt = await bcrypt.genSalt(saltRound);
//          const hashedPw = await bcrypt.hash(password, salt);
 
//          const refreshToken = JWT.sign({}, reSecretKey, {
//              expiresIn: '7d'
//          });
//          const token = `Bearer ${refreshToken}`
//          await this.managerRepository.signup(email, hashedPw)
        

//     }catch(error){
//             console.log(error);
//             return sign.status400();
//         }
//     }

//     // 2. 로그인
//         login = async (email, password, existToken) => {
            

//         }

//     // 3. 회원정보 조회
//     // 4. 회원정보 수정 (비밀번호만 수정 가능)
//     // 5. 회원정보 삭제



// }
// export default ManagerService;