import * as actionTypes from '../actions';
const checkID = (id, todos) => {
    if(todos.filter(todo => todo.id == id)[0]){
      checkID(id++, todos);
    }
    else{
      return id;
    }
}

const initState = {
  todos: [],
  person: ''
}
let ID = 1;

const reducer = (state = initState, action) => {
  switch(action.type){
    case actionTypes.SET_PERSON:
      return {
        ...state,
        person: action.person
      }
      break;

    case actionTypes.USE_CACHE:
      ID = checkID(action.todos.length+1, state.todos);
      return {
        ...state,
        todos: action.todos
      }
      break;
    case actionTypes.ADD_TODO:
      const newTodo = {
        id: checkID(ID++, state.todos),
        title: action.title,
        completed: false
      };
      return {
        ...state,
        todos: state.todos.concat(newTodo)
      }
      break;

    case actionTypes.CHECK_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if(todo.id === action.id){
            return {
              ...todo,
              completed: !todo.completed
            }
          }
          else{
            return todo;
          }
        })
      }
      break;
  }
  return {
    ...state
  }
}

export default reducer;
