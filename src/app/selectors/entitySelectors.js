
const selectors = {
    getAllBoards(state) {
        const boards = state.entities.board || {};
        return Object.values(boards);
    },

    getBoard(state, boardId) {
        const boards = state.entities.board || {};
        return boards[boardId];
    },

    getColumn(state, columnId) {
        const columns = state.entities.column || {};
        return columns[columnId];
    },

    getCard(state, cardId) {
        const cards = state.entities.card || {};
        return cards[cardId];
    }
};

export default selectors;
