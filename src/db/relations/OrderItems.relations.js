import Items from '../models/Items.js'
import OrderItems from '../models/OrderItems.js'


export default () => {

    // Item모델  - OrderCustomers모델 : N:1 관계
    OrderItems.belongsTo(Items, {
        targetKey: 'itemId',
        foreignKey: 'itemId'
    });
};
