import Items from '../db/models/Items.js'


class ItemRepository{

    // 1. 상품추가
    addItems = async (name, price, type) => {
        const item = await Items.create({name, price, type});
        return item;
    }

    // 2.상품 옵션추가

    // 3-(1) 상품 전체 목록조회
    getAllItems = async () => {
        const itemlist = await Items.findAll({
            raw: true,
            attributes: ['itemId', 'name', 'price', 'type', 'createdAt', 'createdAt'],
            include: [{model: Options, attributes:[extraPrice, shotPrice, hot]}],
            order: [['createdAt', 'DESC']]
        });
        return itemlist;
    }

    // 3-(2). 상품 타입별 조회
    getCertainItems = async (category) => {
        const categorizedItemList = await Items.findAll({where: {type: category}});
        return categorizedItemList;
    }

    // 4. 상품 수정
    editItem = async (itemId, name, price) => {
        const updateItem = await Items.update({name, price}, {where: itemId});
        return updateItem;
    }

    // 5. 상품 확인 (삭제 전)
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