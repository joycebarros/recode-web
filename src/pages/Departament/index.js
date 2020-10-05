import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default () => {
  const [departaments, setDepartaments] = useState([]);

  const getDepartaments = () => {
    api.get('/departament').then((response) => {
      const { data } = response;
      setDepartaments(data);
    }).catch(() => {
      toast.error('Unexpected Error');
    });
  };

  useEffect(() => {
    getDepartaments();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      api.delete(`/course/${id}`).then(() => {
        const departamentList = departaments.filter((departament) => departament.id !== id);
        setDepartaments(departamentList);
        toast.success('Course deleted with success');
      }).catch(() => {
        toast.error('Unexpected Error');
      });
    }
  };

  return (
    <Page title="Departament">
      <Link className="btn btn-primary" to="/departament/new">Create Departament</Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departaments.map((departament, index) => (
            <tr key={index}>
              <td>{departament.id}</td>
              <td><Link to={`/departament/${departament.id}`}>{departament.name}</Link></td>
              <td>
                <Button onClick={() => onDelete(departament.id)} color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
};
