import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

export class ExpressApp {
    app = express();

    //생성자
    constructor(){
        this.setAppSettings(); // 첫번째로 실행
        this.setAppRouter(); // 두번째로 실행
    };

    setAppSettings = () => { // 첫번째 실행 -> 라이브러리 실행
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
    };

    setAppRouter = () => { // 두번째실행 -> route 연결
        try{
        this.app.use('/api', routes, (req, res, next, error) => {
            return res.status(200).json({
                success: true,
                message: "연결되었습니다."
            });
        });
    }catch(error){
        console.log(error).json({
            success: false,
            message: error.message,
        })
    }
    }
}
// npm run dev


// const app = express();


// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static("assets"));
// app.use(express.urlencoded({ extended: false }));
// app.use('/api', router)

// export default app


// app.js => init => routes => controller => services => repositories => DataBase
// app.js에서 실행소스 init.js로 분리, app.js는 express app만 관리
// init을 통해 db, express 서버 실행