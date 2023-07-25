import express from 'express';
import cookieParser from 'cookie-parser';
import router from '../routes/index';
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: false }));
app.use('/api', router)

export default app;


// const PORT = 3000
// app.listen(PORT, () => {
//     console.log(PORT, "포트로 서버가 연결되었습니다.")
// })



// app.js => init => routes => controller => services => repositories => DataBase
// app.js에서 실행소스 init.js로 분리, app.js는 express app만 관리
// init을 통해 db, express 서버 실행