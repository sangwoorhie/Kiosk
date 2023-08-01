import Message from './message.service.js';
import OrderRepository from '../repositories/Order.repository.js'
import { orderState } from '../db/models/OrderItems.js'


// message 파일
const noitem = new Message('상품');
const unidentifieditem = new Message('상품 ID');
const unidentifiedorder = new Message('발주 ID')
const undefinedQuantity = new Message('발주 수량');
const itemstatus = new Message('상품 상태')

class OrderService {
    orderRepository = new OrderRepository();
 
    // 1. 상품 발주 생성
    addOrders = async (itemId, amount) => {
       const orderItem = new Message('상품 발주');

    try{    
        // 유효성 검사
        if(!itemId){
            return unidentifieditem.undefined();
        } else if (!amount){
            return undefinedQuantity.undefined();
        }

    // 발주할 아이템 유효성
    const item = await this.orderRepository.checkitems(itemId)
        if(!item){
            return noitem.nonexistent();
        }

    // 발주 생성
    const order = await this.orderRepository.placeOrder(itemId, amount);
    if (order){
        return {
            status: 200,
            message: "상품 발주에 성공했습니다.",
            order: order
        }
    } else {
        return orderItem.status400();
    }
    }catch(error){
        console.log(error);
        return orderItem.status400();
    }};
    

    // OrderItems.state
    // ORDERED: 0
    // PENDING: 1
    // COMPLETED: 2
    // CANCELED: 3


    // 2. 상품 발주 수정   
    editOrders = async (itemId, orderId, state) => {
        const editstatus = new Message('상품 발주상태 수정');
        try{

        // 유효성 검사
        if(!itemId){
            return unidentifieditem.undefined();
        } else if (!orderId){
            return unidentifiedorder.undefined();
        } else if (!state){
            return itemstatus.undefined();
        } else if (!Object.values(orderState).includes(state)){
            return {
                status: 400,
                message: "정확한 상품 상태를 입력해주세요."
            }
        };

        // 발주할 아이템 유효성
        const item = await this.orderRepository.checkitems(itemId)
        if(!item){
            return noitem.nonexistent();
        }

        // 초기 발주상태 previousState (발주 생성된것에서 찾기) (수정할 발주상태는 req.body에 입력한 state)
        const previousState = await this.orderRepository.checkstatus(itemId, orderId);
        if(!previousState.itemId){
            return editstatus.status400();
        }

        // 초기 발주상테 → 수정된 발주상태
        // 1. Ordered (0) → Pending (1) : 조건없이 가능
        // 2. Ordered (0) → Canceled (3) : 조건없이 가능
        // 3. Pending (1) → Canceled (3) : 조건없이 가능
        if(
            (previousState.state == 0 && state == 'PENDING') || //Ordered (0) → Pending (1)
            (previousState.state == 0 && state == 'CANCELED') || // Ordered (0) → Canceled (3)
            (previousState.state == 1 && state == 'CANCELED') //  Pending (1) → Canceled (3)
        ){ 
        // OrderStatus는 결국 OrdserItem테이블의 state컬럼에 있는 배열임
        // 위 3가지의 경우 발주된 아이템의 상태 업데이트하기
        const modifiedState = await this.orderRepository.updateorder(orderId, orderState[state]) 
        return editstatus.status200();
        }
        
        // 초기 발주상테 → 수정된 발주상태
        // 4. Pending (1) → Completed (2) : 트랜젝션 적용, 완료와 동시에 상품 amount 증가
        if(previousState.state == 1 && state == 'COMPLETED'){

            // 아이템 찾기
            const item = await this.orderRepository.checkitems(itemId);
            
            // 수량 업데이트 = 수정할 발주아이템의 수량 + 초기 발주아이템의 수량
            const updatedamount = item.amount + previousState.amount

            // 아이템아이디, 주문아이디, 업데이트된 상태, 업데이트된 수량
            const pendingToComplete = await this.orderRepository.pendingToComplete(itemId, orderId, orderState[state], updatedamount);
            if (pendingToComplete.result == 1){
                return editstatus.status200();
            }
        }
        // 초기 발주상테 → 수정된 발주상태 (주문한 수량보다 현재 수량이 적을 경우 트랜젝션 적용해 상태변경 및 상품 amount 감소)
        // 이미 완료된 발주를 취소하거나, 대기하거나, 재주문하는 경우.
        // 5. Completed (2) → Canceled (3)
        // 6. Completed (2) → Pending (1)
        // 7. Completed (2) → Ordered (0)
        else if (
            (previousState.state == 2 && state == 'CANCELED') ||
            (previousState.state == 2 && state == 'PENDING') ||
            (previousState.state == 2 && state == 'ORDERED')
        ){
            // 아이템 찾기
            const item = await this.orderRepository.checkitems(itemId);

            // 수량 업데이트 = 수정할 발주아이템의 수량 - 초기 발주아이템의 수량
            const updatedamount = item.amount - previousState.amount;
            if (updatedamount < 0){
                return {
                    status: 400,
                    message: "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다."
                }
            }

            // 아이템아이디, 주문아이디, 업데이트된 상태, 업데이트된 수량
            const pendingToComplete = await this.orderRepository.pendingToComplete(itemId, orderId, OrderStatus[state], updatedamount);
            if(pendingToComplete.result == 1){
                return editstatus.status200();
            }else{
                return editstatus.status400();
            }
        }
    }catch(error){
        console.log(error);
        return editstatus.status400();
    }
}
};

export default OrderService;
