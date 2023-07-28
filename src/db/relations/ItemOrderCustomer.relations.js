import ItemOrderCustomers from '../models/ItemOrderCustomers.js'
import Items from '../models/Items.js'
import OrderCustomers from '../models/OrderCustomers.js'

export default () => {
    
    // ItemOrderCustomers모델 - Items모델 : N:1관계
    ItemOrderCustomers.belongsTo(Items, {
      targetKey: 'itemId',
      foreignKey: 'itemId'
    });

    // ItemOrderCustomers모델 - OrderCustomers모델 : N:1관계
    ItemOrderCustomers.belongsTo(OrderCustomers, {
      targetKey: 'orderCustomerId',
      foreignKey: 'orderCustomerId'
    });
}
