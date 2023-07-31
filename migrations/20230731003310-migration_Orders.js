// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Orders', {
//     orderId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.BIGINT
//     },
//     customerId: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//       references: {
//         model: "Customers",
//         key: "customerId",
//       },
//       onDelete: "CASCADE",
//     },
//     is_Customer: {
//       allowNull: false,
//       type: Sequelize.BOOLEAN,
//     },
//     state: {
//       allowNull: false,
//       type: Sequelize.ENUM,
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
//   await queryInterface.dropTable('Orders');
// }