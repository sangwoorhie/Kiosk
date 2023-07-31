import Message from './message.service.js';
import { ItemType } from '../db/models/Items.js'
import ItemRepository from '../repositories/Items.repository.js';
import { BOOLEAN } from 'sequelize';


// message 파일
const anonymous = new Message('이름');
const unspecifiedPrice = new Message('가격'); 
const correctPrice = new Message('알맞은 가격');

class ItemService {
    itemRepository = new ItemRepository();
    

    // 1. 상품추가
    addItems = async (name, price, type) => {
        const add = new Message('상품 추가');

        try{
        if(!name.length){
            return anonymous.undefined(); // Message폴더 함수
        } else if (!price) {
            return unspecifiedPrice.undefined(); // Message폴더 함수
        } else if (price < 0){
            return correctPrice.undefined();
        } else if (!Object.values(ItemType).includes(type)){
            return {
                status: 400,
                message: "알맞은 타입을 지정해주세요."
            }
        };

        const item = await this.itemRepository.addItems(name, price, type);
        if(item.name && item.price){
            return add.status200(); // Message폴더 함수
        }
        }catch(error){
            console.log(error);
            return add.status400();
        }
    }

    // 2. 상품 옵션추가
    optionItems = async (itemId, extraPrice, shotPrice, hot) => {
        const optionadd = new Message('상품 옵션 추가');
        const addedPrice = new Message('상품의 extra 사이즈 선택시 추가될 요금');
        const shot = new Message('상품의 shot 추가 선택시 추가될 요금');
        const exist = new Message('해당 상품');

    try{
        const checkItem = await this.itemRepository.checkItem(itemId);
        if(!checkItem){
            return exist.nonexistent();
        }
        else if(!extraPrice){
            return addedPrice.undefined();
        } else if (extraPrice == 0){
            return {
                status: 400,
                message: "추가요금이 0원일 경우 선택할 수 없습니다."
            }
        } else if (!shotPrice){
            return shot.undefined();
        } else if (shotPrice == 0){
            return {
                status: 400,
                message: "추가요금이 0원일 경우 선택할 수 없습니다."
            }
        } else if (typeof(hot) !== BOOLEAN){
            return {
                status: 400,
                message: "음료 옵션은 hot 또는 cold만 선택 가능합니다."
            }
        };

        const option = await this.itemRepository.optionItem(itemId, extraPrice, shotPrice, is_hot);
        if (option){
            return optionadd.status200();
        } else {
            return optionadd.status400();
        }
    }catch(error){
            console.log(error);
            return optionadd.status400();
        }
    };


    // 3. 상품 목록조회
    getItems = async(category) => { // 카테고리를 쿼리문으로 받아옴
    const inquire  = new Message('상품 조회');

    try{
        // 전제상품 조회
        if(category == 'all'){
            const Itemlist = await this.itemRepository.getAllItems();
            return {
                status: 200,
                message: '전체 상품이 조회되었습니다.',
                data: Itemlist
            }
        } else { // 타입별 상품조회
            const categorizedItems = await this.itemRepository.getCertainItems(category);
            return {
                status: 200,
                message: `${category} 타입의 상품이 조회되었습니다.`,
                data: categorizedItems
            }
        }
        }catch(error){
            console.log(error);
            return inquire.status400();
        };
    };


    // 4. 상품 수정
    putItems = async (itemId, name, price) => {
        const edit = new Message('상품 수정');
    
    try{
        if(!name.length){
            return anonymous.undefined();
        } else if (!price){
            return unspecifiedPrice.undefined();
        } else if (price < 0){
            return correctPrice.undefined();
        }; 

    const item = await this.itemRepository.editItem(itemId, name, price);
        if (item){
            return edit.status200();
        } else {
            return edit.status400();
        }
    }catch(error){
        console.log(error);
        return edit.status400();
    }};


    // 5. 상품 삭제 확인 1
    deleteItems = async (itemId) => {
        const getRidOf = new Message('상품 삭제');

    try{
        const checkItem = await this.itemRepository.checkItem(itemId);
        if(checkItem.amount > 0){ // 상품수량 있는경우 - 질문, API2로 넘어감
            return {
                status: 200,
                message: '현재 수량이 남아있습니다. 삭제하시겠습니까? (예 또는 아니오로 답변해주세요.)'
            }
        } else if (checkItem.amount == 0){ // 상품수량 없는경우 - 즉시삭제
            const removeItem = await this.itemRepository.deleteItems(itemId);
            if (removeItem){
                return getRidOf.status200();
            }
        }
    }catch(error){
        console.log(error)
        return getRidOf.status400();
    }};


    // 6. 상품 삭제 확인 2 
    answerRemoveItems = async(itemId, answer) => {
        const getRidOf = new Message('상품 삭제');

    try{
        if(answer == "예"){ // 대답이 "예"인 경우
            const removeItem = await this.itemRepository.deleteItems(itemId);
            if(removeItem){
                return getRidOf.status200();
            }
        } else { // 반대의 경우 유지.
            return getRidOf.status400();
        }
    }catch(error){
        console.log(error)
        return getRidOf.status400();
    }};


}


export default ItemService;