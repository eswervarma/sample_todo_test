import { put, fork, call, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

/*
 * Subroutines
 */

export function* receiveResponse (response) {
  if (response.ok) {
    const todo = normalize(response.data.todo, schema.todo)

    yield put(actions.setEntity(todo, {type: 'todos'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'todos'}))
  }
}

export function* receiveResponseLists (response) {
  if (response.ok) {
    const todo = normalize(response.data.list, schema.list)

    yield put(actions.setList(todo, {type: 'lists'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'lists'}))
  }
}

export function* addTodo () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = {
        ...{text: action.payload.text},
        listID: action.payload.id // Change this to support multiple lists
      };

      const response = yield call(api.post, '/todos', {...todo})

      yield fork(receiveResponse, response)
    }
  }
}

export function* toggleTodo () {
  while (true) {
    const action = yield take(t.UPDATE_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = action.payload
      const response = yield call(api.put, `/todos/${todo.id}`, {...todo})

      yield fork(receiveResponse, response)
    }
  }
}

export function* addList () {
  while (true) {
    const action = yield take(t.SUBMIT_LIST)
    if (action.meta && action.meta.type === 'list') {
      let todo = {
         name: action.payload.list
      };


      const response = yield call(api.post, '/lists/g', {...todo})

      yield fork(receiveResponseLists, response)
    }
  }
}
/*
 * Watchers
 */

export default function* watchTodos () {
  yield [
    fork(addTodo),
    fork(addList),
    fork(toggleTodo)
  ]
}
