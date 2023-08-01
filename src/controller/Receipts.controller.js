import ReceiptsService from '../service/Receipts.service.js'

class ReceiptsController {
    receiptsService = new ReceiptsService();

    // 1. 상품 주문 생성
    buy = async (req, res) => {
        // order는 itemId, amount, option(JSON)으로 이루어져있음
        const { order } = req.body;
        const { status, message, totalPrice } = await this.receiptsService.buy(order);
        return res.status(status).json({ message, totalPrice });
    };

    // 2. 상품 주문 수정 edit
    edit = async (req, res) => {
        const { orderCustomerId } = req.params;
        const { order } = req.body;
        const { status, message } = await this.receiptsService.edit(orderCustomerId, order);
        return res.status(status).json({ message });
    }

};

export default ReceiptsController;