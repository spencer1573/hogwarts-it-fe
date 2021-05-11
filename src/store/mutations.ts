import { MutationTree } from 'vuex'
import { State } from './state'
import { iStudent, iCourse } from '../interfaces/interfaces'

export enum Mutation {
  INCREMENT = 'INCREMENT',
  SET_STUDENTS = 'SET_STUDENTS',
  SET_ENROLLED_COURSES = 'SET_ENROLLED_COURSES'
}

export type Mutations<S = State> = {
  [Mutation.INCREMENT](state: S, payload: number): void
  [Mutation.SET_STUDENTS](state: S, payload: Array<iStudent>): void
  [Mutation.SET_ENROLLED_COURSES](state: S, payload: Array<iCourse>): void
}

export const mutations: MutationTree<State> & Mutations = {

  [Mutation.INCREMENT](state: State, payload: number = 1) {
    state.count += payload
  },

  [Mutation.SET_STUDENTS](state: State, payload: Array<iStudent>) {
    state.students = payload
  },

  [Mutation.SET_ENROLLED_COURSES](state: State, payload: Array<iCourse>) {
    state.enrolledCourses = payload
  },

}
