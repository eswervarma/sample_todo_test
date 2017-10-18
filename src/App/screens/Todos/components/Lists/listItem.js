import React, { PropTypes } from 'react'

import Todo from '../Todo'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const Lists = ({ lists, onClick }) => {
  let temp = [];
  for(let i in lists){
    temp.push(lists[i])
  }
  const sortedTodos = temp && temp[0] ? sortByDate(temp) : null;
  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedTodos
        ? sortedTodos.map((list, i) =>
          <Todo
            key={i}
            {...{text: list.name}}
            toggle={() => onClick(list)}
            isLast={(lists.length - 1) === i}
            link = {list.id}
          />
        )
        : <p className='ph3 pv3 tc'>No Lists found</p>
      }
    </ul>
  )
}

export default Lists
