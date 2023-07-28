import { Sequelize } from "sequelize"; // 라이브러리 전역변수
import dotenv from 'dotenv'; // 환경변수설정 라이브러리, process.env로 실행


dotenv.config();
const env = process.env;

const sequelize = new Sequelize({
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: 'mysql'
});

export default sequelize ;