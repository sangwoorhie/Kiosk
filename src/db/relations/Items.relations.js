import Items from '../models/Items.js'
import Options from '../models/Options.js'
import OrderItems from '../models/OrderItems.js'
import ItemOrderCustomers from '../models/ItemOrderCustomers.js'

export default () => {
    
    // Items모델 - OrderItems모델 : 1:N 관계
    Items.hasMany(OrderItems, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
    });

    // Items모델 - Options모델 : N:1관계
    Items.belongsTo(Options, {
        targetKey: 'optionId',
        foreignKey: 'optionId'
    });

    // Items모델 - ItemOrderCustomers모델 : 1:1관계
    Items.hasOne(ItemOrderCustomers, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'  
    });
};

