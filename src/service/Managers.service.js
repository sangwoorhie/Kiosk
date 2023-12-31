import Message from './message.service.js';
import ManagerRepository from '../repositories/Managers.repository.js'
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { JWT_KEY, secretKey, reSecretKey } from '../constants.js'
// import { READCOMMITTED } from 'sequelize/types/table-hints.js';

// message 파일
const sign = new Message('회원가입')
const log = new Message('로그인')


class ManagerService {
    managerRepository = new ManagerRepository();

    // 1. 회원가입
    signup = async (email, password, confirm) => {
        const E = new Message('이메일')
        const pw = new Message('비밀번호')
        const cfpw = new Message('확인 비밀번호')

    try{
        // 유효성 검사
            if(!email){
                return E.undefined();
            } else if (!password){
                return pw.undefined();
            } else if (!confirm){
                return cfpw.undefined();
            } else if (password !== confirm){
                return {
                    status: 400,
                    message: "비밀번호가 확인 비밀번호와 일치하지 않습니다."
                }
            }

        // 이메일, 패스워드 정규식
        const Emailcheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const pwcheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;  // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)

            if(!Emailcheck.test(email)){
                return {
                    status: 412,
                    message: "이메일 형식이 올바르지 않습니다."
                }
            } else if (!pwcheck.test(password)){
                return {
                    status: 412,
                    message: "비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다."
                }
            }

        // 중복 검사
        const existCustomer = await this.managerRepository.findbyEmail(email)
            if(existCustomer && existCustomer.email == email){
                return {
                    status: 409,
                    message: "동일한 이메일이 이미 존재합니다."
                }
            } 
                await this.managerRepository.signup(email, password)
                return sign.status200();
            

        // 비밀번호 hash로 암호화저장 + 토큰발급
        // const saltRound = 10;
        // const salt = await bcrypt.genSalt(saltRound);
        // const hashedPw = await bcrypt.hash(password, salt);
 
        // refreshToken 발급
        // const refreshToken = JWT.sign({}, reSecretKey, {
        //      expiresIn: '7d'
        // });

        // const token = `Bearer ${refreshToken}`;
        // await this.managerRepository.signup(email, hashedPw, refreshToken);
        // return {
        //     status: 201,
        //     cookie: {
        //         name: 'refreshToken',
        //         token,
        //         expiresIn: '7d',
        //     },
        //     message: '회원가입에 성공하였습니다.'
        // }
    }catch(error){
            console.log(error);
            return sign.status400();
        }
    }

    // 2. 로그인
        login = async (email, password, cookie) => {
            const E = new Message('이메일')
            const pw = new Message('비밀번호')
            const info = new Message('회원정보')
            
            // 이메일로 매니저계정 찾기
        try{
            const data = await this.managerRepository.findByEmail(email);
            
            // 유효성 검사
            if(!email){
                return E.undefined();
            } else if (!password){
                return pw.undefined();
            } else if (!data){
                return info.nonexistent();
            }

            const manager = {
                ManagerId: data.ManagerId,
                email: data.email,
                password: data.password,
            }

            const Token = JWT.sign({ManagerId: data.ManagerId}, JWT_KEY)
            console.log("Token:", Token)
 
            await this.managerRepository.saveToken(email, Token);
            return {
                status: 200,
                message: "로그인에 성공하였습니다.",
                Token: Token
            };
        }catch(error){
            console.log(error);
            return log.status400();
        }
        }; 

            // 1
            // // 쿠키발급
            // const AccessToken = JWT.sign({ ManagerId: manager.ManagerId }, JWT_KEY);
            // const RefreshToken = JWT.sign({ ManagerId: manager.ManagerId }, JWT_KEY);

            // // TokenType에는 Bearer가 담기고, Token에는 existRefreshToken이 담김.
            // const [ TokenType, Token ] = ( existToken ?? "").split(" ");
            // const verified = JWT.verify(Token, JWT_KEY);

            // // cookie에 existRefreshToken, 즉 Token이 존재하고, 그게 DB와 일치하면서(data.token) + 구조분해한 할당한 토큰(Token)을 JWT키로 인증한 결과가 존재할때(true)일때
            // if(Token == data.token && verified){
            //     return{
            //         status: 200,
            //         message: "로그인이 완료되었습니다.",
            //         AccessToken: AccessToken,
            //         RefreshToken: RefreshToken,
            //     }
            // }
            
            // // 1. refresh토큰이 없는 경우 토큰 재발급 (AccessToken토큰은 기본으로 있음)

            // // 2. A가 로그인을 하고 로그아웃을 안 한 상태로 B가 같은 클라이언트에서 로그인 하면
            // // A가 갖고 있던 refresh token이 쿠키에 남아있는다.
            // // 이런 경우 refresh token이 일치하지는 않으므로 다시 refresh 토큰을 발급하여 넣어준다.
            // // 쿠키에 있는 토큰이랑, 서버(DB)에 있는 토큰이랑 불일치
        
            // // 3. 쿠키에 있는 토큰이랑, 서버(DB)에 있는 토큰이랑 일치하지만, 만료기간이 지나서 verified가 안되는 경우

            // if(!existToken || Token !== data.token || (Token == data.token && !verified)){
            //     await this.managerRepository.saveToken(email, RefreshToken);
            //     return {
            //         status: 200,
            //         message: "로그인이 완료되었습니다.",
            //         AccessToken: AccessToken,
            //         RefreshToken: RefreshToken,
            //     }
            // }


            // 2
            // const ID = data.ManagerId;
            // const [ authType, authToken ] = (existToken ?? "").split(" ");
            // const accessToken = JWT.sign({ ID }, secretKey, {
            //     expiresIn: '7d',
            // });

            // const refreshToken = JWT.sign({}, reSecretKey, {
            //     expiresIn: '7d',
            // });

            // class Returns {
            //     constructor() {}
            //     status201() {
            //         return {
            //             status: 201,
            //             accesscookie: {
            //                 name: 'accessToken',
            //                 token: `Bearer ${accessToken}`,
            //                 expiresIn: 3600,
            //             },
            //             refreshcookie: {
            //                 name: 'refreshToken',
            //                 token: `Bearer ${refreshToken}`,
            //                 expiresIn: '7d',
            //             },
            //             message: "로그인에 성공하였습니다."
            //         }
            //     };
            //     status400() {
            //         return {
            //             status: 400,
            //             accesscookie: null,
            //             refreshcookie: null,
            //             message: "로그인에 실패하였습니다."
            //         }
            //     }
            // };

            // const status = new Returns();
            // try{
            // // 해쉬된 패스워드가 새로 입력한 패스워드와 동일하면 true, 아니면 false
            // const match = await bcrypt.compare(password, data.password);
            //     if(!match){
            //         return log.status400();
            //     } else if (existToken){
            //         const verified = JWT.verify(authToken, reSecretKey);
            //         if (data.token == authToken && verified){
            //             return log.status200();
            //         } else if (data.token !== authToken || !verified){
            //             return log.status200();
            //         } else if (authType !== 'Bearer' || !authToken){
            //             return log.status400();
            //         }
            //     } else if (authType !== 'Bearer' || !authToken){
            //         return log.status400();
            //     } else if (!existToken){
            //         await this.managerRepository.updateToken(email, refreshToken);
            //         return log.status200();
            //     }
            // }catch(error){
            //     console.log(error);
            //     return log.status400();
            // }



    // 3. 회원정보 조회
    info = async (ManagerId) => {
    const user = new Message('회원정보')
    const getInfo = new Message('회원정보 조회')
        try{
            const findUser = await this.managerRepository.findById(ManagerId)
            if(!findUser){
                return user.nonexistent();
            }
            return{
                status: 200,
                message: "회원정보가 조회되었습니다.",
                userInfo: {
                    managerId: findUser.managerId,
                    email: findUser.email,
                    createdAt: findUser.createdAt,
                    updatedAt: findUser.updatedAt,
                }
            }
        }catch(error){
            console.log(error);
            return getInfo.status400();
        }
    }


    // 4. 회원정보 수정 (비밀번호만 수정 가능)
    edit = async (ManagerId, email, password, newpw, confirm) => {
        const user = new Message('회원정보')
        const editInfo = new Message('회원정보 수정')
        const E = new Message('이메일')
        const pw = new Message('비밀번호')
        const npw = new Message('새로운 비밀번호')
        const cfpw = new Message('새로운확인 비밀번호')

    try{
        const findUser = await this.managerRepository.findById(ManagerId)
        
        // 유효성 확인
        if(!findUser){
            return user.nonexistent();
        } else if (!password){
            return pw.undefined();
        } else if (password !== findUser.password){
            return {
                status: 400,
                message: "비밀번호가 일치하지 않습니다."
            }
        } else if (!newpw){
            return npw.undefined();
        } else if (!confirm){
            return cfpw.undefined();
        } else if (newpw !== confirm){
            return {
                status: 400,
                message: "새로운 확인 비밀번호가 일치하지 않습니다."
            }
        }

        // 정보 수정
        const updateInfo = await this.managerRepository.edit(ManagerId, newpw)
        if(updateInfo){
            return editInfo.status200();
        }
    }catch(error){
        console.log(error);
        return editInfo.status400();
    }
    }

    // 5. 회원 탈퇴
    remove = async (ManagerId, email, password) => {
        const user = new Message('회원정보')
        const disappear = new Message('회원 탈퇴')
        const E = new Message('이메일')
        const pw = new Message('비밀번호')

        try{
            const findUser = await this.managerRepository.findById(ManagerId)
            if(!findUser){
                return user.nonexistent();
            } else if (!email){
                return E.undefined();
            } else if (!password){
                return pw.undefined();
            };

            if (email == findUser.email && password == findUser.password){
                await this.managerRepository.remove(ManagerId, email, password);
                return disappear.status200();
            }
        }catch(error){
            console.log(error);
            return disappear.status400();
        }
    }


}
export default ManagerService;