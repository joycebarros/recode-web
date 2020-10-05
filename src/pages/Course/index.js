import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default () => {
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    api.get('/course').then((response) => {
      const { data } = response;
      setCourses(data);
    }).catch(() => {
      toast.error('Unexpected Error');
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      api.delete(`/course/${id}`).then(() => {
        const courseList = courses.filter((course) => course.id !== id);
        setCourses(courseList);
        toast.success('Course deleted with success');
      }).catch(() => {
        toast.error('Unexpected Error');
      });
    }
  };

  return (
    <Page title="Course">
      <Link className="btn btn-primary" to="/course/new">Create Course</Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.id}</td>
              <td><Link to={`/course/${course.id}`}>{course.name}</Link></td>
              <td>
                <Button onClick={() => onDelete(course.id)} color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
};
