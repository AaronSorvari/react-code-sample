import uuid from 'node-uuid';

const localStorage = window.localStorage;

const defaultData = [
    {
        boardId: 'default',
        boardName: 'DIY Kanban Board',
        columns: [
            {
                columnId: uuid.v4(),
                label: 'Sample Column',
                cards: [
                    {
                        cardId: uuid.v4(),
                        title: 'Sample Card',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    }
                ]
            }
        ]
    }
];

const key = 'data';

const storage = {
    getData() {
        if (localStorage) {
            const dataString = localStorage.getItem(key);
            if (dataString) {
                const data = JSON.parse(dataString);
                return data;
            }

            return defaultData;
        }

        return [];
    },

    setData(data) {
        if (localStorage) {
            const dataString = JSON.stringify(data);
            localStorage.setItem(key, dataString);
        }
    }
};

export default storage;
