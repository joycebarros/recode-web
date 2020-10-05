import Departament from '../pages/Departament';
import EditDepartament from '../pages/Departament/edit';
import Allocation from '../pages/Allocation';
import Professor from '../pages/Professor';
import EditProfessor from '../pages/Professor/edit';
import Course from '../pages/Course';
import EditCourse from '../pages/Course/edit';
import Home from '../pages/Home';

const routes = [{
  name: 'Professor',
  component: Professor,
  path: '/professor',
  navbar: true,
},
{
  name: 'Edit Professor',
  component: EditProfessor,
  path: '/professor/:id',
  navbar: false,
},
{
  name: 'Departament',
  component: Departament,
  path: '/departament',
  navbar: true,
},
{
  name: 'Edit Departament',
  component: EditDepartament,
  path: '/departament/:id',
  navbar: false,
},
{
  name: 'Allocation',
  component: Allocation,
  path: '/allocation',
  navbar: true,
}, {
  name: 'Course',
  component: Course,
  path: '/course',
  navbar: true,
},
{
  name: 'Edit Course',
  component: EditCourse,
  path: '/course/:id',
  navbar: false,
},
{
  name: 'Home',
  component: Home,
  path: '/',
  navbar: false,
}];

export default routes;
