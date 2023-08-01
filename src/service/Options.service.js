import Message from './message.service.js'
import OptionsRepository from '../repositories/Options.repository.js'

const extra = new Message('정확한 Extra Price');
const shot = new Message('정확한 Shot Price');
const ishot = new Message('정확한 hot 여부')


class OptionsService {
    optionRepository = new OptionsRepository();

    // 1. 옵션 추가
    addOption = async (extraPrice, shotPrice, hot) => {
        const options = new Message('옵션 추가');

    // 유효성 검사
    try{
        if(!extraPrice){
            return extra.undefined();
        } else if (!shotPrice){
            return shot.undefined();
        } else if (!hot){
            return ishot.undefined();
        }

    // 생성
    const makeOption = await this.optionRepository.addOption(extraPrice, shotPrice, hot);
        if(makeOption){
            return options.status200();
        } else {
            return options.status400();
        }
    }catch(error){
        console.log(error);
        return options.status400();
    }
    }
}

export default OptionsService;