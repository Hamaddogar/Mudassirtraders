import React, { Component } from 'react';
import './App.css';
import Main from './component/Maincomponent'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
// import Header from './component/navbar/navbar';
import { ToastContainer } from 'react-toastify';
import history from './historyProvider';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render = () => {
    return <div>
      <Provider store={store}>
        <Router history={history}>
          <Main>
          </Main>
          {/* <PersistGate persistor={persistor}> */}
          {/* <Main /> */}

          {/* </PersistGate> */}
      </Router>
      </Provider>
      <ToastContainer />
    </div>
  }
}

export default App;
