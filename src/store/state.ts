import { iStudent, iEnrolledCourse } from '../interfaces/interfaces'

export interface State {
  debug: boolean
  version: string
  isInitialized: boolean
  count: number
  students: Array<iStudent>
  enrolledCourses: Array<iEnrolledCourse>
}

const versionString = import.meta.env.MODE === 'development' ? _APP_VERSION + '-dev' : _APP_VERSION

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  version: versionString,
  isInitialized: false,
  count: 0,
  students: [],
  enrolledCourses: []
}

