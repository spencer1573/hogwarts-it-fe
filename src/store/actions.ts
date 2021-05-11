import { ActionTree, ActionContext } from 'vuex'

import { State } from './state'
import { Mutations, Mutation } from './mutations'

import { axios } from '../plugins/request'
import { iStudent, iCourse } from '../interfaces/interfaces'

export enum Action {
  initApp = 'initApp',
  fetchStudents = 'fetchStudents',
  fetchEnrolledCourses = 'fetchEnrolledCourses'
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [Action.initApp]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.fetchStudents]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.fetchEnrolledCourses]({ state, commit, dispatch }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {

  [Action.initApp]({ state, commit, dispatch }) {
    console.log('app inited!')
  },

  async [Action.fetchStudents]({ state, commit, dispatch}) {
    try {
      const response = await axios.get('/students')
      const students: Array<iStudent> = response.data
      commit(Mutation.SET_STUDENTS, students)
    } catch (error) {
      console.error(error)
    }
  },

  async [Action.fetchEnrolledCourses]({ state, commit, dispatch}) {
    try {
      const response = await axios.get('/enrolled-courses')
      const enrolledCourses: Array<iCourse> = response.data
      commit(Mutation.SET_ENROLLED_COURSES, enrolledCourses)
    } catch (error) {
      console.error(error)
    }
  }
}
