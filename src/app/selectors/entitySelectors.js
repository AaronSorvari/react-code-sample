
const selectors = {
    getBoard(state, boardId) {
        const entities = state.entities;
        return entities.board[boardId];
    },

    getColumn(state, columnId) {
        const entities = state.entities;
        return entities.column[columnId];
    },

    getCard(state, cardId) {
        const entities = state.entities;
        return entities.card[cardId];
    }
};

export default selectors;