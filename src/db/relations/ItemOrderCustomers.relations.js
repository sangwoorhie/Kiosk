import ItemOrderCustomers from '../models/ItemOrderCustomers.js'
import OrderCustomers from '../models/OrderCustomers.js'
import Items from '../models/Items.js'

export default () => {
    
    // ItemOrderCustomers모델 - Item모델 : 1:N 관계
    Items.hasMany(ItemOrderCustomers, {
        sourceKey: 'itemId',
        foreignKey: 'itemId'
    });

    // ItemOrderCustomers모델  - OrderCustomers모델 : N:1 관계
    ItemOrderCustomers.belongsTo(OrderCustomers, {
        targetKey: 'orderCustomerId',
        foreignKey: 'orderCustomerId'
    });
};
