import ItemService from '../service/Items.service.js'


class ItemController {
    itemService = new ItemService();

    // 1. 상품추가
    addItems = async (req, res) => {
        const { name, price, type, optionId } = req.body;
        const { status, message } = await this.itemService.addItems(name, price, type, optionId);
        return res.status(status).json({message});
    }

    // // 2. 상품 옵션 추가 ( ItemId, optionId )
    // optionItems = async (req, res) => {
    //     const { itemId } = req.params;
    //     const { extraPrice, shotPrice, is_hot } = req.body;
    //     const { status, message } = await this.itemService.optionItems(itemId, extraPrice, shotPrice, is_hot);
    //     return res.status(status).json({message});
    // } 


    // 3. 상품 목록 조회 (전체목록조회/타입별조회)
    getItems = async (req, res) => {
        const { category } = req.query;
        const { status, message, data } = await this.itemService.getItems(category);
        return res.status(status).json({message, data})
    }

    // 쿼리로 받아오는법
    // localhost:3000/api/items?category=all
    // app.get('/profile', (req, res) => {
    //     const { name, age, gender } = req.query;
    //   https://localhost:3000/profile?name=John&age=30&gender=male

    // 4. 상품 수정 API : PUT api/items/1
    putItems = async (req, res) => {
        const { itemId } = req.params;
        const { name, price } = req.body;
        const { status, message } = await this.itemService.putItems(itemId, name, price);
        return res.status(status).json({message})
    }
    
    // 5. 상품 삭제 API 1 : DELETE api/items/:itemId
    deleteItems = async (req, res) => {
        const { itemId } = req.params;
        const { status, message } = await this.itemService.deleteItems(itemId);
        return res.status(status).json({message})
    }

   // 6. 상품 삭제 API 2 : DELETE api/response/items/:itemsId
   answerRemoveItems = async (req, res) => {
        const { itemId } = req.params;
        const { answer } = req.body;
        const { status, message } = await this.itemService.answerRemoveItems(itemId, answer);
        return res.status(status).json({message});
   }

}




export default ItemController;