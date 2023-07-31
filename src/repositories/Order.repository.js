import OrderItems from '../db/models/OrderItems.js'
import Items from '../db/models/Items.js'
import Orders from '../db/models/Orders.js'
import { Sequelize, Transaction } from 'sequelize';
import sequelize from '../db/sequelize.js';
       

class OrderRepository{

    // 1. 상품 발주 생성
    placeOrder = async (itemId, amount) => {
        
        const order = await OrderItems.create({itemId, amount});
        return order;
    }

    // 2. 발주된 아이템의 상태 찾기
    checkstatus = async (itemId, orderId) => {
        const status = await OrderItems.findOne({where: {itemId, orderId}});
        return status;
    } 

    // 3. 상품 발주 수정
    updateorder = async (orderId, state) => {
        const update = await Orders.update({where: {orderId}}, {state})
        return update;
    }

    // 4. 아이템 찾기
    checkitems = async (itemId) => {
        const item = await Items.findByPk(itemId);
        return item;
    }

    // 5. pendingToComplete 트랜젝션 걸어서 발주 업데이트
    pendingToComplete = async(itemId, orderId, state, updatedamount) => {
        const Trans = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        });

       try{
        // 발주 업데이트
        const orderUpdate = Orders.update(
            { where: { orderId } },
            { state },
            { transaction: Trans }
        );

        // 아이템 업데이트
        const itemUpdate = Items.update(
            { where: { itemId } },
            { amount: updatedamount },
            { transaction: Trans }
        );
        await Trans.commit();
        return { result: 1, current: orderUpdate };

       }catch(error){
        console.log(error)
        await Trans.rollback();
        return { return: 0, current: null };
       }
           
    }

};

export default OrderRepository;