import OptionsService from '../service/Options.service.js'


class OptionsController {
    optionsService = new OptionsService()

    // 1. 옵션 추가
    addOption = async (req, res) => {
        const { extraPrice, shotPrice, hot } = req.body;
        const { status, message } = await this.optionsService.addOption(extraPrice, shotPrice, hot)
        return res.status(status).json({message});
    }

    // 2. 옵션 수정
    editOption = async (req, res) => {
        const { optionId } = req.params;
        const { extraPrice, shotPrice, hot } = req.body;
        const { status, message } = await this.optionsService.editOption(optionId, extraPrice, shotPrice, hot)
        return res.status(status).json({message});
    }

    // 3. 옵션 삭제 1차
    deleteOption = async (req, res) => {
        const { optionId } = req.params;
        const { status, message } = await this.optionsService.deleteOption(optionId);
        return res.status(status).json({message});
    } 

    // 4. 옵션 삭제 2차
    answerRemoveOption = async (req, res) => {
        const { optionId } = req.params;
        const { answer } = req.body;
        const { status, message } = await this.optionsService.remove(optionId, answer);
        return res.status(status).json({message});
    }

}

export default OptionsController;

// {
//     "extraPrice":"",
//     "shotPrice":"",
//     "hot":""
// }