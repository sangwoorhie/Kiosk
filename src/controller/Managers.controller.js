import ManagerService from '../service/Managers.service.js'
// import JWT from 'jsonwebtoken';


export class ManagerController {
    managerService = new ManagerService()


// 1. 회원가입
signup = async (req, res) => {
    const { email, password, confirm } = req.body;
    const { status, message, cookie } = await this.managerService.signup(email, password, confirm);
    
    // cookie값이 있다면
    if(cookie){
        res.cookie(cookie.name, cookie.token, { expiresIn: cookie.expiresIn });
    }
    return res.status(status).json({message, cookie})
}


// 2. 로그인
login = async (req, res) => {
    const existToken = req.cookies.RefreshToken;
    const { email, password } = req.body;
    const { status, message, accesscookie, refreshcookie } = await this.managerService.login(email, password, existToken); 
    // AccessToken, RefreshToken
    
    res.cookie(accesscookie.name, accesscookie.token, { 
        expiresIn: accesscookie.expiresIn
    });
    res.cookie(refreshcookie.name, refreshcookie.token, {
        expiresIn: refreshcookie.expiresIn,
    });

    // res.cookie("AccessToken", `Bearer ${AccessToken}`);
    // res.cookie("RefreshToken", `Bearer ${RefreshToken}`);
    return res.status(status).json({message});
}



// 3. 로그아웃
logout = async (req, res) => {
    try{
        res.clearCookie("Authorization");
        return res.status(200).json({message: "로그아웃 되었습니다."});
    }catch{
        return res.status(400).json({message: "로그아웃에 실패했습니다."});
    }
}


// 4. 회원정보 조회
info = async (req, res) => {
    const { ManagerId } = req.params;
    const { status, message, userInfo } = await this.managerService.info(ManagerId);
    return res.status(status).json({message, userInfo})
}


// 5. 회원정보 수정 (비밀번호만 수정 가능)
edit = async (req, res) => {
    const { ManagerId } = req.params;
    const { email, password, newpw, confirm } = req.body;
    const { status, message } = await this.managerService.edit(ManagerId, email, password, newpw, confirm);
    return res.status(status).json({message})
}



// 6. 회원 탈퇴 (회원정보 삭제)
remove = async (req, res) => {
    const { ManagerId } = req.params;
    const { email, password } = req.body;
    const { status, message } = await this.managerService.remove(ManagerId, email, password)
    return res.status(status).json({message});
}
};

export default ManagerController;
