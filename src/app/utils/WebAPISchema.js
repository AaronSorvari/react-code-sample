import { Schema, arrayOf } from 'normalizr';

const board = new Schema('board', { idAttribute: 'boardId' });
const column = new Schema('column', { idAttribute: 'columnId' });
const card = new Schema('card', { idAttribute: 'cardId' });

board.define({
    columns: arrayOf(column)
});

column.define({
    cards: arrayOf(card)
});

export default { board, column, card };
