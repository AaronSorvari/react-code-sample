// import fetch from 'isomorphic-fetch';

const WebAPIUtils = {
    getBoardData: () => {
        // TODO: don't hardcode the data
        const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        const hardcodedData = [
            {
                boardId: 0,
                boardName: 'The Board',
                columns: [
                    {
                        columnId: 1,
                        orderIndex: 1,
                        label: 'First Column',
                        cards: [
                            {
                                cardId: 1,
                                orderIndex: 1,
                                title: 'Alpha',
                                content: loremIpsum
                            },
                            {
                                cardId: 2,
                                orderIndex: 2,
                                title: 'Bravo',
                                content: loremIpsum
                            },
                            {
                                cardId: 3,
                                orderIndex: 3,
                                title: 'Charlie',
                                content: loremIpsum
                            }
                        ]
                    },
                    {
                        columnId: 2,
                        orderIndex: 2,
                        label: 'Second Column',
                        cards: [
                            {
                                cardId: 4,
                                orderIndex: 1,
                                title: 'Delta',
                                content: loremIpsum
                            },
                            {
                                cardId: 5,
                                orderIndex: 1,
                                title: 'Echo',
                                content: loremIpsum
                            }
                        ]
                    },
                    {
                        columnId: 3,
                        orderIndex: 3,
                        label: 'Third Column',
                        cards: [
                            {
                                cardId: 6,
                                orderIndex: 1,
                                title: 'Foxtrot',
                                content: loremIpsum
                            }
                        ]
                    }
                ]
            }
        ];

        return new Promise((resolve) => {
            resolve(hardcodedData);
        });
    }
};

export default WebAPIUtils;
