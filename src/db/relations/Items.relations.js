import Items from '../models/Items.js'
import Options from '../models/Options.js'
import OrderItems from '../models/OrderItems.js'

export default () => {
    
  // Items모델 - Options모델 : N:1 관계
  Items.belongsTo(Options, {
    targetKey: 'optionId',
    foreignKey: 'optionId'
});

  // Items모델 - OptionItem모델 : 1:N 관계
  Items.hasMany(OrderItems, {
    sourceKey: 'itemId',
    foreignKey: 'itemId'
});
}
