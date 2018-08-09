import React from 'react';
import classes from './Home.scss';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class Home extends React.Component {

  componentWillReceiveProps(nextProps){
    console.log("Receiving props");
    if(nextProps.todos !== this.props.todos){
      localStorage.setItem("todos", JSON.stringify(nextProps.todos));
    }
  }

  componentDidMount = () => {

    let cachedTodos = localStorage.getItem("todos");
    let cachedPerson = localStorage.getItem("person");
    if(cachedPerson !== "null" && cachedPerson !== null){
      // console.log("Not prompting");
      if(!this.props.person){
        this.props.setPerson(cachedPerson);
      }
    }
    else{
      // console.log("prompting");
      let person = prompt("Please enter your name:", "John Doe");
      this.props.setPerson(person);
    }
    cachedTodos = JSON.parse(cachedTodos);
    if(cachedTodos && cachedTodos[0] && !this.props.todos[0]){
      this.props.useCache(cachedTodos);
    }
    if(this.props.todos[0]){
      localStorage.setItem("todos", JSON.stringify(this.props.todos));
    }
    window.addEventListener("beforeunload", (ev) => {
      localStorage.setItem("todos", JSON.stringify(this.props.todos));
      localStorage.setItem("person", this.props.person);
    });
  }

  componentWillUnmount = () => {
    localStorage.setItem("todos", JSON.stringify(this.props.todos));
    localStorage.setItem("person", this.props.person);

  }

  render() {


    let toDos = (
        <div style={{alignItems:'center'}} className={classes.todo}>
          <li style={{justifyContent:'center'}} >Add some ToDos!</li>
          <button className={classes.addButton} onClick={() => this.props.history.push('/add')}>Click here!</button>
        </div>
    );
    if(this.props.todos[0]){
        toDos = this.props.todos.map(todo => (
          <div key={todo.id} className={classes.todo}>
            <li id={todo.id} className={todo.completed ? 'strikethrough': null}>{todo.title}</li>
            <p>Completed: <input onChange={()=>this.props.checkTodo(todo.id)} type="checkbox" name="vehicle" value="Bike" checked={todo.completed} /></p>
          </div>
        ));
    }

    return (
        <div className={classes.Home}>
          <header className={classes.HomeHeader}>
            <h1 className={classes.HomeTitle}>{`${this.props.person}'s Todos`}</h1>
          </header>
          <ul id="list" className={classes.people}>
            {toDos}
          </ul>
        </div>
    );
  }
}

const mapStateToProps= state => {
  return {
    todos: state.todos,
    person: state.person
  };
}
const mapDispatchToProps= dispatch => {
  return {
    useCache: (todos) => dispatch({type: actionTypes.USE_CACHE, todos: todos}),
    checkTodo: (id) => dispatch({type: actionTypes.CHECK_TODO, id: id}),
    setPerson: (person) => dispatch({type: actionTypes.SET_PERSON, person: person})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
