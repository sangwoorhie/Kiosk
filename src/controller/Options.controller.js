import OptionsService from '../service/Options.service.js'


class OptionsController {
    optionsService = new OptionsService()

    // 1. 옵션 추가
    addOption = async (req, res) => {
        const { extraPrice, shotPrice, hot } = req.body;
        const { status, message } = await this.optionsService.addOption(extraPrice, shotPrice, hot)
        return res.status(status).json({message});
    }


}

export default OptionsController;

// {
//     "extraPrice":"",
//     "shotPrice":"",
//     "hot":""
// }