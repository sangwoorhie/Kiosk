import OrderCustomers from '../models/OrderCustomers.js'
import ItemOrderCustomers from '../models/ItemOrderCustomers.js'


export default () => {
    
    // OrderCustomers모델 - ItemOrderCustomers모델 : 1:N 관계
    OrderCustomers.hasMany(ItemOrderCustomers, {
        sourceKey: 'orderCustomerId',
        foreignKey: 'orderCustomerId'
    });
};
