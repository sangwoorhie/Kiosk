import Items from '../db/models/Items.js'
import Options from '../db/models/Options.js'
import Cache from '../cache/cache.js'

class ItemRepository{

    // 1. 상품추가
    addItems = async (name, price, type, optionId) => {
        const item = await Items.create({name, price, type, optionId});
        return item;
    };

    // 2. 옵션 찾기
    findOption = async (optionId) => {
        const option = await Options.findByPk(optionId);
        return option;
    };

    // 3. 상품 찿기 (상품이 존재하는지 확인)
    checkItem = async (itemId) => {
        const checkItem = await Items.findByPk(itemId);
        return checkItem;
    };


    // 4-(1) 상품 전체 목록조회
    // option이 추가되었으므로, raw: true 추가.
    getAllItems = async () => {
        const itemlist = await Items.findAll({ raw: true });
        return itemlist;
    };
            // raw: true,
            // attributes: ['itemId', 'name', 'price', 'type', 'createdAt', 'createdAt'],
            // include: [{model: Options, attributes:[extraPrice, shotPrice, hot]}],
            // order: [['createdAt', 'DESC']]

    // 4-(2). 상품 타입별 조회
    getCertainItems = async (category) => {
        const categoryItem = await Items.findAll({
            where: { type: category },
            raw: true,
        });
        return categoryItem;
    };

    // 5. 상품 수정
    // update를 컨트롤클릭하면 인자로 this(자기자신), values, options를 받는다.
    editItem = async (itemId, name, price) => { //values       //options
        const updateItem = await Items.update({name, price}, {where: {itemId}});
        return updateItem;
    }


    // 6. 상품 삭제
    deleteItems = async (itemId) => {
        const deleteItem = await Items.destroy({where: {itemId}});
        return deleteItem;
    }
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



export default ItemRepository;