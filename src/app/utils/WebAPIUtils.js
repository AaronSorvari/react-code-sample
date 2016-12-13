// import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';
import localStoragePersistence from './localStoragePersistence';

function getBoardId(boardName, data) {
    const slugBase = boardName.replace(/[^A-Za-z0-9-]+/, '-');
    let slug = slugBase;
    let increment = 1;
    const findExistingBoardPredicate = x => x.boardId === slug;
    while (data.find(findExistingBoardPredicate)) {
        increment += 1;
        slug = `${slugBase}-${increment}`;
    }

    return slug;
}

const WebAPIUtils = {
    getBoardData: () => new Promise((resolve) => {
        const data = localStoragePersistence.getData();
        resolve(data);
    }),

    addBoard: ({ boardName }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const board = {
            boardId: getBoardId(boardName, data),
            boardName,
            columns: []
        };

        data.push(board);
        localStoragePersistence.setData(data);

        return new Promise((resolve) => {
            resolve(board);
        });
    },

    addColumnToBoard: ({ boardId, columnLabel }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const board = data.find(x => x.boardId === boardId);
        const column = {
            columnId: uuid.v4(),
            label: columnLabel,
            cards: []
        };

        board.columns.push(column);
        localStoragePersistence.setData(data);

        return new Promise((resolve) => {
            resolve(column);
        });
    },

    addCardToColumn: ({ boardId, columnId, cardTitle, cardContent }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const board = data.find(x => x.boardId === boardId);
        const column = board.columns.find(x => x.columnId === columnId);
        const card = {
            cardId: uuid.v4(),
            title: cardTitle,
            content: cardContent
        };

        column.cards.push(card);
        localStoragePersistence.setData(data);

        return new Promise((resolve) => {
            resolve(card);
        });
    },

    deleteBoard: ({ boardId }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const boardIndex = data.findIndex(x => x.boardId === boardId);
        data.splice(boardIndex, 1);
        localStoragePersistence.setData(data);

        return new Promise(resolve => resolve());
    },

    deleteColumn: ({ boardId, columnId }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const board = data.find(x => x.boardId === boardId);
        const columnIndex = board.columns.findIndex(x => x.columnId === columnId);
        board.columns.splice(columnIndex, 1);
        localStoragePersistence.setData(data);

        return new Promise(resolve => resolve());
    },

    deleteCard: ({ boardId, columnId, cardId }) => {
        // TODO: Create REST endpoint
        const data = localStoragePersistence.getData();
        const board = data.find(x => x.boardId === boardId);
        const column = board.columns.find(x => x.columnId === columnId);
        const cardIndex = column.cards.findIndex(x => x.cardId === cardId);
        column.cards.splice(cardIndex, 1);
        localStoragePersistence.setData(data);

        return new Promise(resolve => resolve());
    }
};

export default WebAPIUtils;
