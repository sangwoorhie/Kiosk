import Customers from '../models/Customers.js'
import OrderItems from '../models/OrderItems.js'
import Orders from '../models/Orders.js'

export default () => {
    
    // Orders모델  - OrderItems모델 : 1:N 관계
    Orders.hasMany(OrderItems, {
        sourceKey: 'orderId',
        foreignKey: 'orderId'
    });

    // Orders모델  - Customers모델 : N:1 관계
    Orders.belongsTo(Customers, {
        targetKey: 'customerId',
        foreignKey: 'customerId'
    });
};
