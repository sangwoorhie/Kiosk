const ItemType = {
    coffee: 'COFFEE',
    tea: 'TEA',
    juice: 'JUICE',
    desert: 'DESERT',
    smoothie: 'SMOOTHIE',
  };


const ItemState = {
    ORDERED: 0,
    PENDING: 1,
    COMPLETED: 2,
    CANCELED: 3,
};

export default { ItemType, ItemState };