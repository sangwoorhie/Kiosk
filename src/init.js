import dotenv from 'dotenv'; // 환경변수설정 라이브러리
import Http from 'http';
import { ExpressApp } from './app.js';
import sequelize from './db/sequelize';

dotenv.config(); // 환경변수설정 라이브러리, process.env로 실행

export class Server {
    expressApp = new ExpressApp(); // expressApp = 새로 생성된 인스턴스
    httpServer; // 안써도되지만, 쓸 것이므로 미리 선언

    constructor() { // 생성자 함수
        // http라이브러리에서 Server를 받아와서, app을 HttpServer로 실행시킴 
        this.httpServer = new Http.Server(this.expressApp.app);
    };

    DBconnection = () => {
        return this.SQAuthenticate().then(this.sequelizeSync)
    };

    SQAuthenticate = () => {
        //test connection
        return sequelize.authenticate();
    };

    sequelizeSync = () => {
        return sequelize.sync({force: false});
    };

    // 코드 마지막에 실행되는 runServer()매서드.
    runServer = async() => { // async-await, try-catch
    try{
        await this.DBconnection(); // 테스트함수
        return this.serverListen(); // 실행함수
    }catch(error){
        return this.serverErrorHandler(error); // 에러함수
    }};

    serverListen = () => {
        const { PORT: PORT, HOST: HOST } = process.env; // dotenv 라이브러리 실행
        return this.httpServer.listen(PORT, () => {
            console.log(`Server is running on: http://${HOST}:${PORT}`)
        });
    }

    serverErrorHandler = (error) => {
        console.log('Server run error: ', error.message)
    }
}

const server = new Server(); // 서버 객체를 만들고,
server.runServer(); // 서버를 실행함.
