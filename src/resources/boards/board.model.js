const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Default Board',
    columns = { title: 'default', order: 0 }
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
