import React from 'react';
import classes from './add.scss';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class Add extends React.Component{
  state = {
    todo: ''
  }
  changeTodo = (e) => {
    this.setState({todo:e.target.value});
  }

  submitTodo = () => {
    this.props.addTodo(this.state.todo);
    this.props.history.push('/');
  }

  render(){

    return(
      <div className={classes.add}>
        <form onSubmit={this.submitTodo}>
          <h1>Add a Todo: </h1>
          <input type="text" value={this.state.todo} onChange={this.changeTodo} placeholder="Find my dog"/>
          <input className="submit" type="submit"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title) => {
      dispatch({type: actionTypes.ADD_TODO, title: title});
    }
  }
}

export default connect(null, mapDispatchToProps)(Add);
