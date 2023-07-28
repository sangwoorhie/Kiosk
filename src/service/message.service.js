class Message {
    constructor(message) {
        this.message = message;
    }

    status200() {
        return{
            status: 200,
            message: `${this.message}에 성공하였습니다.`
        }
    }

    status400() {
        return{
            status: 400,
            message: `${this.message}에 실패하였습니다.`
        }
    }

    nonexistent() {
        return{
            status: 404,
            message: `${this.message}이(가) 존재하지 않습니다.`
        }
    }

    undefined() {
        return{
            status:400,
            message: `${this.message}을(를) 입력해주세요.`
        }
    }
};

export default Message;