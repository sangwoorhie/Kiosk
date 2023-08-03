import Options from '../db/models/Options.js';
import Items from '../db/models/Items.js';
import Cache from '../cache/cache.js'


class OptionsRepository {

    // 1. 옵션추가, 캐시 적용.
    addOption = async (extraPrice, shotPrice, hot) => {
        const option = await Options.create({extraPrice, shotPrice, hot});
        const options = await Options.findAll();
        const success = Cache.set('options', options, 10000);
        
        if(success){
            console.log('cache success')
        } else {
            console.log('cache failed');
        }
        return option;
    }

    // 2. 옵션 찾기
    getOptions = async () => {
        const options = await Options.findAll({raw: true});
        return options;
    }

    // 3. ID로 옵션찾기
    checkId = async (optionId) => {
        const option = await Options.findByPk(optionId);
        return option;
    }

    // 4. 옵션 수정
    edit = async (optionId, extraPrice, shotPrice, hot) => {
        const update = await Options.update(
            {extraPrice, shotPrice, hot},
            {where : {optionId}}
        )
        return update;
    }

    // 5. 옵션 삭제
    remove = async (optionId) => {
        await Items.destroy({ where: { optionId: optionId }})
        const remove = await Options.destroy({where: {optionId}});
        return remove;
    }

};

export default OptionsRepository;