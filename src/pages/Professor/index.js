import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default () => {
  const [professors, setProfessors] = useState([]);

  const getProfessors = () => {
    api.get('/professor').then((response) => {
      const { data } = response;
      setProfessors(data);
    }).catch(() => {
      toast.error('Unexpected Error');
    });
  };

  useEffect(() => {
    getProfessors();
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      api.delete(`/professor/${id}`).then(() => {
        const professorList = professors.filter((professor) => professor.id !== id);
        setProfessors(professorList);
        toast.success('Professor deleted with success');
      }).catch(() => {
        toast.error('Unexpected Error');
      });
    }
  };

  return (
    <Page title="Professor">
      <Link className="btn btn-primary" to="/professor/new">Create Professor</Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>CPF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor, index) => (
            <tr key={index}>
              <td>{professor.id}</td>
              <td><Link to={`/professor/${professor.id}`}>{professor.name}</Link></td>
              <td>{professor.cpf}</td>
              <td>
                <Button onClick={() => onDelete(professor.id)} color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
};
