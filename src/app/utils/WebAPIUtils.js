// import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';
import localStoragePersistence from './localStoragePersistence';

const WebAPIUtils = {
    getBoardData: () => new Promise((resolve) => {
        const data = localStoragePersistence.getData();
        resolve(data);
    }),

    addBoard: ({ boardName }) => {
        // TODO: Create REST endpoint
        const board = {
            boardId: uuid.v4(),
            boardName,
            columns: []
        };

        const data = localStoragePersistence.getData();
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
    }
};

export default WebAPIUtils;
