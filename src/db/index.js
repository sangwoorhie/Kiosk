import sequelize from "./sequelize.js"
import Relations from './relations/index.js';

import Options from './models/Options.js'
import Items from './models/Items.js'
import OrderItems from './models/OrderItems.js'
import ItemOrderCustomers from './models/ItemOrderCustomers.js'
import OrderCustomers from './models/OrderCustomers.js'
import Managers from './models/Managers.js'

Object.values(Relations).forEach(relationsFunction => {
    relationsFunction();
});

export { sequelize, Options, Items, OrderItems, ItemOrderCustomers, OrderCustomers, Managers };