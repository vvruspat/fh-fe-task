import React from 'react';
import { Provider } from "react-redux";
import { ModalsRoot } from './components/Modals/Modals';
import { Home } from './components/pages/Home/Home';
import store from "./redux/store";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ModalsRoot>
        <Home />
      </ModalsRoot>
    </Provider>
  );
}

export default App;
