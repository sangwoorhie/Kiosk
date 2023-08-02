// import ManagerService from '../service/Managers.service.js'
// // import JWT from 'jsonwebtoken';


// export class ManagerController {
//     managerService = new ManagerService()


// // 1. 회원가입
// signup = async (req, res) => {
//     const { email, password, confirm } = req.body;
//     const { status, message, cookie } = await this.managerService.signup(email, password, confirm);
//     return res.status(status).json({message, cookie})
// }


// // 2. 로그인
// login = async (req, res) => {
//     const existToken = req.cookies.RefreshToken;
//     const { email, password } = req.body;
//     const { status, message, AccessToken, RefreshToken } = await this.managerService.login(email, password, existToken);

//     res.cookie("AccessToken", `Bearer ${AccessToken}`);
//     res.cookie("RefreshToken", `Bearer ${RefreshToken}`);
//     return res.status(status).json({message});
// }



// // 3. 로그아웃
// logout = async (req, res) => {
//     try{
//         res.clearCookie("Authorization");
//         return res.status(200).json({message: "로그아웃 되었습니다."});
//     }catch{
//         return res.status(400).json({message: "로그아웃에 실패했습니다."});
//     }
// }


// // 4. 회원정보 조회
// info = async (req, res) => {
//     const { customerId } = req.params;
//     const { status, message, userInfo } = await this.managerService.info(customerId);
//     return res.status(status).json({message, userInfo})
// }


// // 5. 회원정보 수정 (비밀번호만 수정 가능)
// edit = async (req, res) => {
//     const { customerId } = req.params;
//     const { email, password, confirm, newpw } = req.body;
//     const { status, message } = await this.managerService.edit(customerId, email, password, confirm, newpw);
//     return res.status(status).json({message})
// }



// // 6. 회원정보 삭제
// remove = async (req, res) => {
//     const { customerId } = req.params;
//     const { email, password } = req.body;
//     const { status, message } = await this.managerService.remove(customerId, email, password)
//     return res.status(status).json({message});
// }
// };

// export default ManagerController;
