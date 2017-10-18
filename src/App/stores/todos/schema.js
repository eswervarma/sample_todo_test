import { Schema, arrayOf } from 'normalizr'

export const todo = new Schema('todos');
export const list = new Schema('lists');
export const arrayOfTodos = arrayOf(todo);
