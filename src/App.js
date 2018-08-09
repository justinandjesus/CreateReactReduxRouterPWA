import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';

class App extends React.Component {

  render() {
    return (
        <div>
          <Navbar />
          <AppRouter />
        </div>
    );
  }
}

export default App;
