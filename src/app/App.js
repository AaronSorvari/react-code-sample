import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import routes from './routes';
import AppActions from './actions/AppActions';
import MasterModal from './components/MasterModal/MasterModal';

injectTapEventPlugin();

let store;
let history;

const App = {
    /**
     * Run application
     */
    run() {
        // create store
        store = configureStore();

        // create browser history for router
        history = syncHistoryWithStore(browserHistory, store);

        // render aplication
        ReactDOM.render(
            <AppContainer key={Math.random()}>
                <MuiThemeProvider>
                    <Provider store={store}>
                        <div>
                            <Router history={history}>{routes}</Router>
                            <MasterModal />
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>,
            document.getElementById('container')
        );

        // dispatch initialize action
        store.dispatch(AppActions.initializeAsync());
    }
};


if (module.hot) {
    module.hot.accept('./routes', () => {
        const nextRoutes = require('./routes').default;

        ReactDOM.render(
            <AppContainer key={Math.random()}>
                <MuiThemeProvider>
                    <Provider store={store}>
                        <div>
                            <Router history={history}>{nextRoutes}</Router>
                            <MasterModal />
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </AppContainer>,
            document.getElementById('container')
        );
    });
}

export default App;
