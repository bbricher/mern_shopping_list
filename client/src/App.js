import React from 'react';
import AppNavbar from './Components/AppNavbar';
import ShoppingList from './Components/ShoppingList';
import ItemModal from './Components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
