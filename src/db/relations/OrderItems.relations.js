import Items from '../models/Items.js'
import OrderItems from '../models/OrderItems.js'
import Orders from '../models/Orders.js'

export default () => {
    
    // OrderItems모델  - Items모델 : N:1 관계
    OrderItems.belongsTo(Items, {
        targetKey: 'itemId',
        foreignKey: 'itemId'
    });

    // OrderItems모델  - Orders모델 : N:1 관계
    OrderItems.belongsTo(Orders, {
        targetKey: 'orderId',
        foreignKey: 'orderId'
    });
};
