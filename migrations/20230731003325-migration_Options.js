// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Options', {
//     optionId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.BIGINT
//     },
//     extraPrice: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//     },
//     shotPrice: {
//       allowNull: false,
//       type: Sequelize.BIGINT,
//     },
//     is_hot: {
//       allowNull: false,
//       type: Sequelize.BOOLEAN
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
//   await queryInterface.dropTable('Options');
// }