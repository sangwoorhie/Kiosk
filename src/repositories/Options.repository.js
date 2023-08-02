import Options from '../db/models/Options.js';
import Items from '../db/models/Items.js';
import Cache from '../cache/cache.js'


class OptionsRepository {

    // 옵션추가, 캐시 적용.
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

    getOptions = async () => {
        const options = await Options.findAll()
        return options;
    }

};

export default OptionsRepository;