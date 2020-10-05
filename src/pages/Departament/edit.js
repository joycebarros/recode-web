import React, { useState, useEffect } from 'react';
import {
  Button, Input, FormGroup, Label,
} from 'reactstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../services/api';

export default function Edit(props) {
  const [form, setForm] = useState({ name: '' });
  const { history, match: { params: { id } } } = props;
  const isNewDepartament = id === 'new';

  const onError = () => {
    toast.error('Unexpected Error');
  };

  useEffect(() => {
    if (!isNewDepartament) {
      api.get(`/departament/${id}`)
        .then(({ data }) => {
          setForm({
            name: data.name,
          });
        })
        .catch(onError);
    }
  }, [id, isNewDepartament]);

  const onSuccess = () => {
    const action = isNewDepartament ? 'Created' : 'Updated';
    toast.info(`${action} with Success`);
    history.push('/departament');
  };

  const onSubmit = () => {
    const formData = {
      ...form,
    };
    if (isNewDepartament) {
      api.post('/departament', formData)
        .then(onSuccess)
        .catch(onError);
    } else {
      api.put(`/departament/${id}`, formData)
        .then(onSuccess)
        .catch(onError);
    }
  };

  const onChange = (event) => {
    const { target: { name, value } } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Page title={isNewDepartament ? 'Create Departament' : 'Edit Departament'}>
      <div>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={form.name}
            name="name"
            type="text"
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <Button onClick={onSubmit}>Save</Button>
    </Page>
  );
}
