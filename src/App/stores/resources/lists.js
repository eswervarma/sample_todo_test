import uniq from 'lodash/uniq'
import includes from 'lodash/includes'
import isPlainObject from 'lodash/isPlainObject'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import { createSelector } from 'reselect'

import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = []

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_LIST]: (state, {payload: { entities, result },
    meta}) => {
    //add the list to the store.
    let newList = entities[meta.type];
    if(state[result] === undefined){
      state = {
        ...state,
        [result]: newList[result]
      }
    }
    return state;
  }
})

export const getIds = createSelector(state => state, ids => ids);
