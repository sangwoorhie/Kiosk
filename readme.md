npm run dev
https://teamsparta.notion.site/20fe3a55c81043149d60d072c6e6f779

https://teamsparta.notion.site/Node-js-Lv5-3438e66dadcd468bba12bbdbf0933d34

과제 목표 : 제공된 데이터를 이용해 키오스크 기능을 가진 서버를 구현한다.

1. 손님들의 주문을 받아 가격이 있는 영수증을 발행한다.
2. DB로 상품의 재고를 관리한다.
3. 서버 메모리 캐시로 데이터의 옵션을 관리한다.

[1] Items

1. 상품 추가 API  
POST api/items

2. 상품 조회 API (전체목록조회 / 카테고리별 조회)
GET api/items

3. 상품 수정 API 
PATCH api/items/:itemId

4. 상품 삭제 API 1차
DELETE api/items/:itemId

5. 상품 삭제 API 2차
DELETE api/response/items/:itemId



[2] Orders

1. 상품 발주 생성 API
POST api/items/:itemId/orders

2. 발주 상태 수정 API
PATCH api/items/:itemId/order/:orderItemId


[3] Receipts

1. 상품 주문 생성 API
POST api/receipts

2. 상품 주문 수정 API
PATCH api/receipts/:orderCustomerId


[4] Options

1. 옵션 추가 API
POST : api/options

2. 옵션 수정 API
PATCH : api/options/:optionId

3. 옵션 삭제 API 1차 
DELETE : api/options/:optionId

4. 옵션 삭제 API 2차 
DELETE : api/response/options/:optionId


[5] Managers

1. 회원가입 API
POST api/manager/signup

2. 로그인 API
POST api/manager/login

3. 로그아웃 API
POST api/manager/logout

4. 회원정보조회 API
GET api/manager/:ManagerId

5. 회원정보수정 API
PATCH api/manager/:ManagerId

6. 회원탈퇴 API
DELETE api/manager/:ManagerId

-------------------------------------------------------------

필수기능
> 필수 기능을 정의해 보면 아래와 같습니다.
> 
- 상품 관리
    - 현재 보유중인 상품의 수량을 관리합니다.
    - 수량이 모자랄 경우 새로 발주를 넣고 발주가 완료되면 상품의 수량에 추가됩니다.

- 주문 관리
    - 고객의 주문을 받을 수 있어야합니다.
    - 등록된 주문의 완료 및 취소 처리가 가능해야 합니다.

- 상품 옵션 관리
    - 각각의 상품별로 다른 옵션을 가질 수 있습니다.
        - 아이스, 핫
        - extra 사이즈 여부 및 가격
        - 샷 추가 여부 및 가격
    - 빈번한 수정이 일어나지 않는 데이터들은 서버 메모리에 저장해서 사용합니다.

- 보너스 미션
유저 테이블을 추가해 승인된 사용자(관리자)만 상품 관리를 할 수 있게 구현해봅시다.
단, 주문은 비회원, 회원 구분없이 모두가 가능해야합니다. 



------------------------------------------------------------------------------------------------

item - itemOrderCustomer => 1:1 (아이템아이디 기준 아이템 찾음)

itemOrderCustomer - OrderCustomer -> N:1

주문번호 및으로 달릴 상품내역이 아이템오더커스토머
아이템 아이템오더 커스토머 1대1관계

아이템오더커스토머 상품의 수량
어떤것인지 찾기위한 테이블 - 아이템

아이템 - 아이템오더커스토머 일대일
아이템오더커스토머 (중간맵핌테이블) = 수량

키오스크 물품 몇개팔렸는지가 중요함.
 
아이템아이디 기준 = 어떤상품이 몇날몇일` 팔렸는지

매니저 테이블 만든다면, 
유저테이블 새로 들어가야함 - 권한 들어가야함
일반유저 - 주문한것은 (기록이 남아야함)
비회원 - 비회원이 주문했다는 기록
상품발주,수량변경 - 미들웨어통해서 권한체크
회원비회원 상관없이 주문받아야함 - 

오더커스토머 - 유저아이디들어가야함.

유저정보가 없더라도 403 튕겨내면 안됨
정보만 뽑아내는 미들웨어를 만들어야함.


DB 운영자가 0 회원이 1
오더커스토머 - 비회원주문에 대한 기록: null하거나, 하나 만들어도됨.


상품관련

CRUD
서버메모리 - 캐시를 사용해서 서버에 램을 저장하는 것.
앞서 만든 CRUD을 수정

npm install node-cache --save