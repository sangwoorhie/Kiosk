import Items from '../db/models/Items.js'
import Options from '../db/models/Options.js'

class ItemRepository{

    // 1. 상품추가
    addItems = async (name, price, type) => {
        const item = await Items.create({name, price, type});
        return item;
    }

    // // 2.옵션생성
    // optionItem = async (itemId, extraPrice, shotPrice, is_hot) => {
    //     // optionID생성
    //     const option = await Options.create({extraPrice, shotPrice, is_hot})
    //     optionId = option.optionId

   
    //     // 기존아이템에 optionID 업데이트
    //     const itemoptionAdd = await Items.update(
    //         {optionId},  {where: {itemId}})
    // }

    // 3-(1) 상품 전체 목록조회
    getAllItems = async () => {
        const itemlist = await Items.findAll();
        return itemlist;
    }
            // raw: true,
            // attributes: ['itemId', 'name', 'price', 'type', 'createdAt', 'createdAt'],
            // include: [{model: Options, attributes:[extraPrice, shotPrice, hot]}],
            // order: [['createdAt', 'DESC']]

    // 3-(2). 상품 타입별 조회
    getCertainItems = async (category) => {
        const categorizedItemList = await Items.findAll({where: {type: category}});
        return categorizedItemList;
    }

    // 4. 상품 수정
    // update를 컨트롤클릭하면 인자로 this(자기자신), values, options를 받는다.
    editItem = async (itemId, name, price) => { //values       //options
        const updateItem = await Items.update({name, price}, {where: {itemId}});
        return updateItem;
    }

    // 5. 상품 확인 (상품이 존재하는지 확인)
    checkItem = async (itemId) => {
        const checkItem = await Items.findByPk(itemId);
        return checkItem;
    }

    // 6. 상품 삭제
    deleteItems = async (itemId) => {
        const deleteItem = await Items.destroy({where: {itemId}});
        return deleteItem;
    }
}


export default ItemRepository;