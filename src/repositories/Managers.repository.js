import Manager from '../db/models/Managers.js'

class ManagerRepository{


    // 1. 회원가입
    signup = async (email, password) => {
        const create = await Manager.create({
            email,
            password,
        })
        return create;
    }

    // 2. 이메일 찾기
    findByEmail = async (email) => {
        const data = await Manager.findOne({ where: {email} })
        return data;
    }

    // 3. 토큰 업데이트
    saveToken = async (email, RefreshToken) => {
        const updated = await Manager.update(
            { token: RefreshToken },
            { where: { email } }
        );
        return updated;
    }


    // 4. 회원정보 조회
    findById = async (ManagerId) => {
        const get = await Manager.findByPk(ManagerId);
        return get;
    }

    // 5. 회원정보 수정 (비밀번호만 수정 가능)
    edit = async (ManagerId, newpw) => {
        const edit = await Manager.update(
            { password : newpw },
            { where: {ManagerId} }
        )
        return edit;
    }

    // 6. 회원정보 삭제
    remove = async (ManagerId, email, password) => {
        const remove = await Manager.destroy(
            { where: {ManagerId, email, password}}
        );
        return remove;
    }

    // 이메일로 유저 찾기
    findbyEmail = async (email) => {
        const user = await Manager.findOne(
            {where: { email }}
        )
        return user;
    }

}

export default ManagerRepository;