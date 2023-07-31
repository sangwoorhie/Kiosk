import OrderItems from '../db/models/OrderItems.js'
import Items from '../db/models/Items.js'
import { Sequelize, Transaction } from 'sequelize';
import sequelize from '../db/sequelize.js';
       

class OrderRepository{

    // 1. 상품 주문 생성
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
        const update = await OrderItems.update({state}, {where: {orderId}})
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
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });

       try{
        
        // 발주 업데이트
        const orderUpdate = Orders.update(
            { state },
            { where: { orderId } },
            { transaction: Trans }
        );

        // 아이템 업데이트
        const itemUpdate = Items.update( // update다음 인자값 순서는 this, values, options.
            { amount: updatedamount },
            { where: { itemId } },
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