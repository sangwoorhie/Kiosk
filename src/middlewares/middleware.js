import JWT from 'jsonwebtoken';
import { JWT_KEY } from '../constants';
import { Managers } from '../db' 

const middleware = async (req, res, next) => {
    try{
    const { AccessToken } = req.cookies;
    const [ TokenType, Token ] = ( AccessToken ?? "" ).split(" ");

    if(TokenType !== "Bearer"){
        return res.status(403).json({message: "authorization error"})
    } else if (!Token){
        return res.status(404).json({message: "Token does not exist"})
    }

    // 복호화된 토큰
    const decodedToken = JWT.verify( Token, JWT_KEY );
    const ManagerId = decodedToken.ManagerId;

    const customer = await Managers.findOne({where: {ManagerId}});

    if(!manager){
        return res.status(404).json({message: "user not found"})
    }
    res.locals.user = manager;
    next();
}catch(error){
    console.log(error);
    return res.status(500).json({message: "Internal server error"})
}
};


export default middleware;