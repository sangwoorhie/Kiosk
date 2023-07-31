// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Items', {
//     itemId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.BIGINT
//     },
//     optionId: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//       references: {
//         model: "Options",
//         key: "optionId",
//       },
//       onDelete: "CASCADE",
//     },
//     name: {
//       allowNull: false,
//       type: Sequelize.STRING,
//     },
//     price: {
//       allowNull: false,
//       type: Sequelize.BIGINT
//     },
//     type: {
//       allowNull: false,
//       type: Sequelize.ENUM,
//     },
//     amount: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//       defaultValue: 0
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
//   await queryInterface.dropTable('Items');
// }