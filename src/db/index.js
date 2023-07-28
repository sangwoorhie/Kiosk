import sequelize from "./sequelize.js";
import Relations from './relations/index.js';

import Items from './models/Items.js';
import ItemOrderCustomers from './models/ItemOrderCustomers.js';
import Options from './models/Options.js';
import OrderItems from './models/OrderItems.js';
import OrderCustomers from './models/OrderCustomers.js';

// Relations파일에서 export된 5가지 폴더의 객체의 값(value)를 forEach로 돌림
Object.values(Relations).forEach(relationsFunction => {
    relationsFunction();
});

// multi-export (import를 여러개 해오므로 export도 여러개 가능)
// 대신 이 폴더를 import하는 쪽에서는 여러개중 하나를 받는 것이므로 중괄호 해야함
export { sequelize, Items, ItemOrderCustomers, Options, OrderItems, OrderCustomers }; 