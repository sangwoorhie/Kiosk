import Items from '../models/Items.js'
import Options from '../models/Options.js'
import OrderItems from '../models/OrderItems.js'
import ItemOrderCustomers from '../models/ItemOrderCustomers.js'


export default () => {
    
    // Item모델 - Item모델 : 1:N 관계
    Items.hasMany(OrderItems, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
    });

    // Item모델 - Item모델 : 1:N 관계
    Items.hasMany(ItemOrderCustomers, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
    });

    // Item모델  - OrderCustomers모델 : N:1 관계
    Items.belongsTo(Options, {
        targetKey: 'optionId',
        foreignKey: 'optionId'
    });
};
