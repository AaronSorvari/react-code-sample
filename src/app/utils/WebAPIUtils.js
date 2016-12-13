// import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';

// TODO: don't hardcode the data
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const hardcodedData = [
    {
        boardId: 'default',
        boardName: 'The Board',
        columns: [
            {
                columnId: uuid.v4(),
                label: 'First Column',
                cards: [
                    {
                        cardId: uuid.v4(),
                        title: 'Alpha',
                        content: loremIpsum
                    },
                    {
                        cardId: uuid.v4(),
                        title: 'Bravo',
                        content: loremIpsum
                    },
                    {
                        cardId: uuid.v4(),
                        title: 'Charlie',
                        content: loremIpsum
                    }
                ]
            },
            {
                columnId: uuid.v4(),
                label: 'Second Column',
                cards: [
                    {
                        cardId: uuid.v4(),
                        title: 'Delta',
                        content: loremIpsum
                    },
                    {
                        cardId: uuid.v4(),
                        title: 'Echo',
                        content: loremIpsum
                    }
                ]
            },
            {
                columnId: uuid.v4(),
                label: 'Third Column',
                cards: [
                    {
                        cardId: uuid.v4(),
                        title: 'Foxtrot',
                        content: loremIpsum
                    }
                ]
            }
        ]
    }
];

const WebAPIUtils = {
    getBoardData: () => new Promise((resolve) => {
        resolve(hardcodedData);
    }),

    addBoard: ({ boardName }) => {
        const board = {
            boardId: uuid.v4(),
            boardName,
            columns: []
        };

        hardcodedData.push(board);

        return new Promise((resolve) => {
            resolve(board);
        });
    },

    addColumnToBoard: ({ boardId, columnLabel }) => {
        const board = hardcodedData.find(x => x.boardId === boardId);
        const column = {
            columnId: uuid.v4(),
            label: columnLabel,
            cards: []
        };

        board.columns.push(column);

        return new Promise((resolve) => {
            resolve(column);
        });
    },

    addCardToColumn: ({ boardId, columnId, cardTitle, cardContent }) => {
        const board = hardcodedData.find(x => x.boardId === boardId);
        const column = board.columns.find(x => x.columnId === columnId);
        const card = {
            cardId: uuid.v4(),
            title: cardTitle,
            content: cardContent
        };

        column.cards.push(card);

        return new Promise((resolve) => {
            resolve(card);
        });
    }
};

export default WebAPIUtils;
