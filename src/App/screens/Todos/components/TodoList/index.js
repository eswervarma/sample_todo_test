import React, { PropTypes } from 'react'
import {Link} from 'react-router';
import Todo from '../Todo'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const TodoList = ({ todos, toggleTodo }) => {
  const sortedTodos = todos && todos[0] ? sortByDate(todos) : null

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedTodos
        ? todos.map((todo, i) =>
          <Todo
            key={i}
            {...todo}
            toggle={() => toggleTodo(todo, !todo.completed)}
            isLast={(todos.length - 1) === i}
          />
        )
        : <p className='ph3 pv3 tc'>No todos found</p>
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array
}

import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from '../AddTodo'

export class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'filter':'all'}
  }
  componentWillUpdateProps(props){
    this.props = props;
  }
  filter(filtertype){
    this.setState({'filter':filtertype});
  }
  filterTodosOfList(listid, list){
    let templist = [];
    for(let i in list){
      let item = list[i],eligible = false;
      if(list[i] && list[i].listID === listid){
        eligible = true;
      }
      if(eligible && this.state){
        if(this.state.filter === 'completed' && !item.completed){
          eligible = false;
        }else if(this.state.filter === 'active' && item.completed){
          eligible = false;
        }else if(this.state.filter === 'all'){
          eligible = true;
        }
      }
      if(eligible){
        templist.push(list[i]);
      }
    }
    return templist;
  }
  render() {

    let todos =  this.filterTodosOfList(this.props.params.id, this.props.todos);
    let toggleTodo = this.props.toggleTodo;
    return (
      <section className='pa3 pa5-ns'>
        <Link to={"/"}>Back</Link>
        <AddTodo onSubmit={({todo}, _, {reset}) => {
          this.props.addTodo(todo,this.props.params.id);
          reset()
        }} />
        <div className="cf">
          <div className="fl w-20 tc pv1 bg-black-025">
            <h1 className='f4 bold center mw6'>All Todos</h1>
          </div>
          <div className="fl w-80 tc pv1 bg-black-025">
            <div className="cf">
              <div className="fl w-80 tc pv1 bg-black-025">
                <div className="ph3">
                  <div className="cf">
                    <div className="fl w-33 tc pv1 bg-black-025"><a className={this.state.filter === 'all' ? "f6 link dim br-pill ba ph3 pv2 mb2 dib white bg-black": "f6 link dim br-pill ba ph3 pv2 mb2 dib black"} href="#0" onClick={this.filter.bind(this,'all')}>All</a>
                    </div>
                    <div className="fl w-33 tc pv1 bg-black-025"><a className={this.state.filter === 'completed' ? "f6 link dim br-pill ba ph3 pv2 mb2 dib white bg-black": "f6 link dim br-pill ba ph3 pv2 mb2 dib black"}  href="#0" onClick={this.filter.bind(this,'completed')}>Completed</a>
                    </div>
                    <div className="fl w-33 tc pv1 bg-black-025"><a className={this.state.filter === 'active' ? "f6 link dim br-pill ba ph3 pv2 mb2 dib white bg-black": "f6 link dim br-pill ba ph3 pv2 mb2 dib black"}  href="#0" onClick={this.filter.bind(this,'active')}>Active</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fl w-20 tc pv1 bg-black-025">
              </div>
            </div>
          </div>
        </div>


        <TodoList {...{ todos, toggleTodo }} />
      </section>
    )
  }
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
    todos: getEntities('todos')(state)
  }),
  dispatch => ({
    addTodo: (text,id) => dispatch(actions.submitEntity({ text,id }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)

