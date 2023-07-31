import Customers from '../models/Customers.js'
import Orders from '../models/Orders.js'

export default () => {
    
    // Customers모델 - Orders모델 : 1:N 관계
    Customers.hasMany(Orders, {
      sourceKey: 'customerId',
      foreignKey: 'customerId'
  });
  }
  