import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router';
const Todo = ({ text, completed, toggle, isLast,link }) => {
  const todoClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast,
      'strike i': completed
    }
  )
  if(link){
    return (
      <li className={todoClass}><Link className="f4 fw6 db black link dim" to={'/'+link}>{text}</Link></li>
    )
  }else{
    return (
      <li className={todoClass} onClick={() => toggle()}>{text}</li>
    )
  }
}

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default Todo
