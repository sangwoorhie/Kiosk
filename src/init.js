import dotenv from 'dotenv'; // 환경변수설정 라이브러리
import Http from 'http';
import { ExpressApp } from './app.js'; // app.js파일에서 ExpressApp 클래스 하나만을 선택했으므로 선택사항중 하나를 선택할 수 있는 경우에는 변수에 중괄호 붙음.
import sequelize from './db/sequelize.js'; // export가 default일때는 변수에 중괄호 안함
import CacheInit from './cache/cache.init.js'

dotenv.config(); // 환경변수설정 라이브러리, process.env로 실행

export class Server {
    expressApp = new ExpressApp(); // expressApp = 새로 생성된 인스턴스
    httpServer; // 안써도되지만, 쓸 것이므로 미리 선언

    cache = new CacheInit();

    constructor() { // 생성자 함수
        // http라이브러리에서 Server를 받아와서, app을 HttpServer로 실행시킴 
        this.httpServer = new Http.Server(this.expressApp.app);
    };

    DBconnection = () => {
        return this.SQAuthenticate().then(this.sequelizeSync);
    };

    SQAuthenticate = () => {
        //test connection
        return sequelize.authenticate();
    };

    // 동기화
    sequelizeSync = () => { // .sync로 스키마를 만듦. 마이그레이션 없어도 됨
        return sequelize.sync({force: false}); // (force: false): sync써도 디비 안날라가게해줌
    };

    // 코드 마지막에 실행되는 runServer()매서드.
    runServer = async() => { // async-await, try-catch
    try{
        await this.DBconnection(); // 테스트함수
        await this.cache.cacheinit(); //Cache 연결 함수
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


