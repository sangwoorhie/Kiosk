import Message from './message.service.js'
import OptionsRepository from '../repositories/Options.repository.js'
import Cache from '../cache/cache.js'
import CacheInit from '../cache/cache.init.js'


const extra = new Message('정확한 Extra Price');
const shot = new Message('정확한 Shot Price');
const ishot = new Message('정확한 hot 여부')


class OptionsService {
    optionRepository = new OptionsRepository();
    // 캐시 설정
    cacheInit = new CacheInit();

    // 1. 옵션 추가
    addOption = async (extraPrice, shotPrice, hot) => {
        const options = new Message('옵션 추가');

    // 유효성 검사
    try{
        if(!extraPrice || extraPrice == undefined){
            return extra.undefined();
        } else if (!shotPrice || shotPrice == undefined){
            return shot.undefined();
        } else if (!hot || hot == undefined){
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


    // 2. 옵션 수정
    editOption = async (optionId, extraPrice, shotPrice, hot) => {
        const edit = new Message('옵션 수정');
        const ID = new Message('옵션 ID');
        const checkOption = await this.optionRepository.checkId(optionId)

        try{ 
            if(!extraPrice || extraPrice == undefined){
                return extra.undefined();
            } else if (!shotPrice || shotPrice == undefined){
                return shot.undefined();
            } else if (!hot || hot == undefined){
                return ishot.undefined();
            }  else if (!checkOption || checkOption == undefined){
                return ID.nonexistent();
            }

        const option = await this.optionRepository.edit(optionId, extraPrice, shotPrice, hot);
            if(option){
            
            // 옵션 수정, 캐시저장
            await this.cacheInit.cacheInit();
                return edit.status200();
            } else {
                return edit.status400();
            }
        }catch(error){
            console.log(error);
            return edit.status400();
        }
    };


    // 3. 옵션 삭제 1차
    deleteOption = async (optionId) => {
        const option = new Message('해당 옵션');
        const getRidof = new Message('옵션 삭제')

    try{
        const checkOption = await this.optionRepository.checkId(optionId)
        if(!checkOption || checkOption == undefined){
            return option.nonexistent();
        } 
        // 삭제할 해당 OptionId를 캐시에 저장함
        Cache.set(`deleteOption${optionId}`, optionId, 10000);
        return {
            status: 200,
            message: "옵션 삭제시 해당 옵션이 적용된 상품이 전부 삭제됩니다. 계속 하시겠습니까? (예 또는 아니오로 대답해주세요.)"
        }
    }catch(error){
        console.log(error);
        return getRidof.status400();
    }
    };


    // 4. 옵션 삭제 2차
    remove = async (optionId, answer) => {
        const option = new Message('해당 옵션');
        const getRidof = new Message('옵션 삭제')

    try{
        const checkOption = await this.optionRepository.checkId(optionId);
        if(!checkOption || checkOption == undefined){
            return option.nonexistent();
        } 

        // 삭제할 해당 OptionId를 캐시에서 가져옴. 대답이 "예" 이고, 저장된 optionId가 params의 optionId와 동일한 경우
        const deleteOption = Cache.get(`deleteOption${optionId}`);
        if (answer == "예" && deleteOption == optionId){
            const remove = await this.optionRepository.remove(optionId);
            console.log("remove:", remove); // 삭제한 레코드 수가 반환됨 (1개삭제시 1반환)
            if(remove){
                await this.cacheInit.cacheInit();
                return getRidof.status200();
            } else {
                return getRidof.status400();
            }
        } else {
            return getRidof.status400();
        }
    }catch(error){
        console.log(error);
        return getRidof.status400();
    }
    };

}

export default OptionsService;
