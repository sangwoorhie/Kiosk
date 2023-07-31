import sequelize from "./sequelize.js";
import Relations from './relations/index.js';

import Customers from './models/Customers.js';
import Items from './models/Items.js';
import Managers from './models/Managers.js';
import Options from './models/Options.js';
import OrderItems from './models/OrderItems.js';
import Orders from './models/Orders.js';

// Relations파일에서 export된 5가지 폴더의 객체의 값(value)를 forEach로 돌림
Object.values(Relations).forEach(relationsFunction => {
    relationsFunction();
});

// multi-export (import를 여러개 해오므로 export도 여러개 가능)
// 대신 이 폴더를 import하는 쪽에서는 여러개중 하나를 받는 것이므로 중괄호 해야함
export { sequelize, Customers, Items, Managers, Options, OrderItems, Orders }; 

 
// DATABASE 생성 로우쿼리문 (관계설정 제외하고 만듦)

// CREATE TABLE Customers (
//     customerId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
//   );
  
  
//   CREATE TABLE Items (
//     itemId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     optionId BIGINT NOT NULL DEFAULT 0,
//     name VARCHAR(255) NOT NULL UNIQUE,
//     price BIGINT NOT NULL,
//     type ENUM('COFFEE', 'TEA', 'JUICE', 'DESSERT', 'SMOOTHIE') NOT NULL,
//     amount BIGINT NOT NULL DEFAULT 0,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
//   FOREIGN KEY (optionId) REFERENCES Options (optionId)
//   );
  
  
  
//   CREATE TABLE Managers (
//     managerId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
//   );
  
  
//   CREATE TABLE Options (
//     optionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     extraPrice INT NOT NULL,
//     shotPrice INT NOT NULL,
//     is_hot BOOLEAN NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
//   );
  
  
//   CREATE TABLE OrderItems (
//     orderItemId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     itemId BIGINT NOT NULL,
//     orderId BIGINT NOT NULL,
//     amount BIGINT NOT NULL DEFAULT 0,
//     price BIGINT NOT NULL,
//     optionis JSON NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
//   )
  
//   CREATE TABLE Orders (
//     orderId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     userId BIGINT NOT NULL,
//     is_User BOOLEAN NOT NULL,
//     state ENUM('ORDERED', 'PENDING', 'COMPLETED', 'CANCELED') NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  
//   FOREIGN KEY (customerId) REFERENCES Customers (customerId)
//   FOREIGN KEY (orderId) REFERENCES OrderItems (orderId)
//   );