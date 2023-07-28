import Options from '../models/Options.js';
import Items from '../models/Items.js'

export default () => {
    
    // Options모델-Items모델 : 1:N관계
    Options.hasMany(Items, {
      sourceKey: 'optionId',
      foreignKey: 'optionId'
    });
  };