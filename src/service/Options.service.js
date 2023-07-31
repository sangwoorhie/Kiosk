import Message from './message.service.js'
import OptionsRepository from '../repositories/Options.repository.js'




class OptionsService {
    optionRepository = new OptionsRepository();

}

export default OptionsService;