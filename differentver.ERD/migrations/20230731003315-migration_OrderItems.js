// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('OrderItems', {
//     orderItemId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.BIGINT
//     },
//     itemId: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//       references: {
//         model: "Items",
//         key: "itemId",
//       },
//       onDelete: "CASCADE",
//     },
//     orderId: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references: {
//         model: "Orders",
//         key: "orderId",
//       },
//       onDelete: "CASCADE",
//     },
//     amount: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//     },
//     option: {
//       allowNull: false,
//       type: Sequelize.JSON,
//     },
//     price: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.fn("now")
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.fn("now")
//     }
//   });
// }
// export async function down(queryInterface, Sequelize) {
//   await queryInterface.dropTable('OrderItems');
// }