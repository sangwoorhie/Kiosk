import { OrderCustomers, ItemOrderCustomers, Items, OrderItems } from "../db";
import { Transaction } from "sequelize";
import sequelize from "../db/sequelize.js";


class ReceiptsRepository {

    // 구매
    buy = async () => {
        const item = await OrderCustomers.create({});
        return item;
    }

    // 주문
    order = async (orderCustomerId, itemId, amount, option, price) => {
        const order = await ItemOrderCustomers.create({
            orderCustomerId,
            itemId,
            amount,
            option,
            price,
        })
        return order;
    }

    // 상품찾기
    findItem = async(itemId) => {
        const findeditem = await Items.findByPk(itemId)
        return findeditem;
    }

    // 주문찾기
    findOrder = async (orderCustomerId) => {
        const id = await OrderCustomers.findByPk(orderCustomerId);
        return id
    }

    // 주문내역상세
    findDetailOrder = async (orderCustomerId) => {
        const findDetailOrder = await ItemOrderCustomers.findAll({
            where: {orderCustomerId},
        })
        return findDetailOrder;
    }


    // 주문사항 변경 트랜젝션 적용.
    changeState = async (orderCustomerId, id, amount) => {
        const Trans = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });
        try{
            const orderUpdate = await OrderCustomers.update(
                { state: true },
                { where: { orderCustomerId } },
                { transaction: Trans },
            );
            const itemUpdate = await Items.update(
                { amount },
                { where: { id } },
                { transaction: Trans },
            );
                await Trans.commit();
                return 1;
        }catch(error){
            console.log(error);
            await Trans.rollback();
            return 0;
        }
    };


    // 주문 취소
    deleteOrder = async(orderCustomerId) => {
        const Trans = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        })
        try{
            const deleteOrderCustomer = await ItemOrderCustomers.destroy(
                { where: {orderCustomerId} },
                { transaction: Trans },
            )
                await Trans.commit();
                return 1;
        }catch(error){
            console.log(error);
            await Trans.rollback();
            return 0;
        }
    };
}

export default ReceiptsRepository;
