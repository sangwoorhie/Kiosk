// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../sequelize.js'

// export const OrderStatus = {
//   ORDERED: 0,
//   PENDING: 1,
//   COMPLETED: 2,
//   CANCELED: 3,
// };

//   class Orders extends Model {}
  
//   Orders.init({
//     orderId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.BIGINT,
//     },
//     customerId: {
//       allowNull: false,
//       type: DataTypes.BIGINT,
//     },
//     is_Customer: {
//         allowNull: false,
//         type: DataTypes.BOOLEAN,
//         defaultValue: 0,
//     },
//     state: {
//         allowNull: false,
//         type: DataTypes.ENUM,
//         values: ['ORDERED', 'PENDING', 'COMPLETED', 'CANCELED']
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW
//     }
//   }, {
//     sequelize,
//     modelName: 'Orders',
//   });

//   export default Orders;
