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
  const isNewCourse = id === 'new';

  const onError = () => {
    toast.error('Unexpected Error');
  };

  useEffect(() => {
    if (!isNewCourse) {
      api.get(`/course/${id}`)
        .then(({ data }) => {
          setForm({
            name: data.name,
          });
        })
        .catch(onError);
    }
  }, [id, isNewCourse]);

  const onSuccess = () => {
    const action = isNewCourse ? 'Created' : 'Updated';
    toast.info(`${action} with Success`);
    history.push('/course');
  };

  const onSubmit = () => {
    const formData = {
      ...form,
    };
    if (isNewCourse) {
      api.post('/course', formData)
        .then(onSuccess)
        .catch(onError);
    } else {
      api.put(`/course/${id}`, formData)
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
    <Page title={isNewCourse ? 'Create Course' : 'Edit Course'}>
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
