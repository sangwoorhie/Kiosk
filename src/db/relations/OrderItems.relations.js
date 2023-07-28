import OrderItems from '../models/OrderItems.js'
import Items from '../models/Items.js'

export default () => {
    
    // OrderItems모델 - Items모델 : N:1 관계
    OrderItems.belongsTo(Items, {
        targetKey: 'itemId',
        foreignKey: 'itemId'
    });
};


      