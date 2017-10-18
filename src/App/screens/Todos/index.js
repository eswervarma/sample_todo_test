import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router';
import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'
import AddList from './components/AddList';
import Lists from "./components/Lists/listItem";
import {getLists} from "../../stores/resources/index";
export class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillUpdateProps(props){
    this.props = props;
  }

  render() {
    let onEachListClick = (listToShow) => {
      return this.redirect(listToShow.id);
    };
    return <section className='pa3 pa5-ns'>
      {/*<AddTodo onSubmit={({todo}, _, {reset}) => {*/}
      {/*addTodo(todo)*/}
      {/*reset()*/}
      {/*}} />*/}

      {/*<h1 className='f4 bold center mw6'>All Todos</h1>*/}

      {/*<TodoList {...{ todos, toggleTodo }} />*/}
      <AddList onSubmit={({list}, _, {reset}) => {
        {this.props.addList(list)}
        reset()
      }} />
      <h1 className='f4 bold center mw6'>Your lists</h1>
      <Lists {...this.props}/>
    </section>
  }
}

Todos.propTypes = {
  todos: PropTypes.array
};
// Map state and dispatch to props
function mapStateToProps (state) {
  return {
    lists: getLists('todos')(state),
  };
}

function mapDispatchToProps (dispatch) {
  return dispatch => ({
    addList: (list) => dispatch(actions.submitList({list}, {type: 'list'}))
  })
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(Todos)
