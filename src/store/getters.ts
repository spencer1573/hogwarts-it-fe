import { GetterTree } from 'vuex'
import { State } from './state'
import { iStudent } from '../interfaces/interfaces'

export type Getters = {
  isReady(state: State): boolean,
  getStudents(state: State): Array<iStudent>
}

export const getters: GetterTree<State, State> & Getters = {
  isReady(state) {
    return !state.isInitialized
  },
  getStudents(state) {
    return state.students
  }
}
