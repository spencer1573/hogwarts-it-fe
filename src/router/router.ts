// TODO #rm
// export default { 
//   '/': 'Home', 
//   '/students': 'Students'
// }

import { createWebHistory, createRouter } from 'vue-router'
import Students from '../pages/students.vue'
import AddStudent from '../pages/addStudent.vue'
import EnrolledCourses from '../pages/enrolledCourses.vue'

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/add-student',
      component: AddStudent,
    },
    {
      path: '/enrolled-courses',
      component: EnrolledCourses,
    },
    {
      path: '/students',
      component: Students
    },
  ]
})

export default router;