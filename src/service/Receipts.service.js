import Message from './message.service.js';
import ReceiptsRepository from '../repositories/Receipts.repository.js';

const orderItem = new Message('상품 주문');
const ID = new Message('해당 상품의 ID');
const quantity = new Message('정확한 수량');
const optional = new Message('상품의 옵션')

class ReceiptsService {
    receiptsRepository = new ReceiptsRepository();

// 1. 상품 주문 생성
buy = async (order) => {
    try{
        const receipt = await this.receiptsRepository.buy();

        // 총 가격 초깃값=0, for문으로, body에서 받아온 order의 인자들을 배열로 돌림.
        // order는 itemId, amount, option(JSON)으로 이루어져있음
        let totalPrice = 0;
        for (let i = 0; i < order.length; i++){
            const itemId = order[i].itemId;
            const amount = order[i].amount;
            const option = order[i].option;

        // 위에 receipt가 구매한 고객(OrderCustomers)에서 생성되어나온 변수이므로
        // 그 변수(receipt)의 orderCustomerId가 곧 구매고객의 id.(orderCustomerId)
        const orderCustomerId = receipt.orderCustomerId

        // 아이템 찾고, 그 아이템의 금액 찾기.
        const findItem = await this.receiptsRepository.findItem(itemId)
        const price = findItem.price

        if(!findItem){
            return ID.nonexistent();
        } else if (!amount){
            return quantity.nonexistent();
        } else if (!option){
            return optional.nonexistent();
        }


        // ItemOrderCustomers 모델에서 생성한 주문로그.
        const orderlog = await this.receiptsRepository.order(
                orderCustomerId,
                itemId,
                amount,
                option,
                price * amount, // findItem.price * amount
            );


        // 위에서 찾은 findItem의 optionId가, orderlog를 map으로 돌려서 나온 것들 중 하나의 optionId와 일치할때
        const optionDetail = orderlog.options.map(op => {
            if(findItem.optionId == op.optionId){
                return op;
            } else {
                return null;
            }
        }).filter(item => item !== null);


        // optionDetail은 orderlog를 map함수로 돌렸으므로 배열형태.
        const optionPrice = 
        optionDetail[0].extraPrice * option.extraPrice +
        optionDetail[0].shotPrice * option.shotPrice;

        totalPrice = totalPrice + price * amount + optionPrice;
   
        }
        // return orderItem.status200(),
        return{
            status: 200,
            message: "상품 주문에 성공했습니다.",
            totalPrice
        }
    }catch(error){
        console.log(error);
        return orderItem.status400();
    }
    }

    // OrderItems.state
    // ORDERED: 0
    // PENDING: 1
    // COMPLETED: 2
    // CANCELED: 3


// 2. 상품 주문 수정
edit = async (orderCustomerId, order) => {
    const editItem = new Message('상품 주문 수정');

    try{
        // 기존에 주문내역 찾기. (OrderCustomers 모델에서 findByPk로 찾기)
        const findOrder = await this.receiptsRepository.findOrder(orderCustomerId);
        if(!findOrder){
            return ID.nonexistent();
        }

        // 만약 "완료"로 주문을 한다면. => (ItemOrderCustomers 모델에서 findAll로 찾기)
        if(order == 'COMPLETED'){
            let findDetailOrder = await this.receiptsRepository.findDetailOrder(orderCustomerId)
        

        // 주문 완료시 `트랜잭션` 을 적용해 주문 처리 완료와 동시에 해당 아이템(들)의 amount 감소 처리
        let changeState = 0;
        for (let i = 0; i < findDetailOrder.length; i++){

            const id = findDetailOrder[i].itemId; // ItemOrderCustomers모델의 itemId 배열 돌리기
            const findItem = await this.receiptsRepository.findItem(id); // 그 ItemId로 상품 찾기
            const amount = findItem.amount - findDetailOrder[i].amount; // 상품의 총 amount - ItemOrderCustomers모델 상품의 amount 
        
            changeState = await this.receiptsRepository.changeState(orderCustomerId, id, amount)   
        }

        // repository에서 트랜젝션해서 1일 경우 commit, 0일 경우 rollback;
        if (changeState == 1){ 
            return editItem.status200();
        } else {
            return editItem.status400();
        };
        }

        else if (order == 'CANCELED'){
            if(findOrder.state == true){
                return {
                    status: 400,
                    message: '완료된 주문은 취소할 수 없습니다.'
                }
            }
        };
    
        // 주문 취소 :  order_customer 데이터, item_order_customer 데이터 트랜잭션 적용해 일괄 삭제
        const deleteOrder = await this.receiptsRepository.deleteOrder(orderCustomerId);
        if (deleteOrder == 1){
            return editItem.status200();
        } else {
            console.log(rollback);
            return editItem.status400();
        }
    }catch(error){
        console.log(error);
        return editItem.status400();
    }
}
};


export default ReceiptsService;
