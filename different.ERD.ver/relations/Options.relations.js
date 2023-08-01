import Items from '../models/Items.js'
import Options from '../models/Options.js'

export default () => {
  
  // Options모델 - Items모델 : 1:N 관계
  Options.hasMany(Items, {
    sourceKey: 'optionId',
    foreignKey: 'optionId'
});
}