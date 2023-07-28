import OrderService from '../service/Order.service.js'

class OrdersController {
    orderService = new OrderService();

    // 1. 상품 발주
    addOrders = async (req, res) => {
        const { itemId } = req.params;
        const { amount } = req.body;
        const { status, message, order } = await this.orderService.addOrders(itemId, amount);
        return res.status(status).json({message, order});
    }

    // 2. 상품 발주 수정
    editOrders = async (req, res) => {
        const { itemId, orderId } = req.params;
        const { state } = req.body;
        const { status, message } = await this.orderService.editOrders(itemId, orderId, state);
        return res.status(status).json({message});
    }

}

export default OrdersController;