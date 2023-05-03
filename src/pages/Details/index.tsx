import React, { FC, PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useToDo } from '../../context/TodoProvider';

const Details: FC<PropsWithChildren> = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const { getTodoById } = useToDo();

  const data = React.useMemo(
    () => (id ? getTodoById(parseInt(id)) : null),
    [id]
  );

  const handleBackBtn = () => navigate('/');

  if (!data) return <>`no data for id ${id}`</>;

  return (
    <>
      <h2>detalles de ToDo</h2>
      <ul>
        <li>{`Nombre ${data.name}`}</li>
        <li>{`ID ${data.id}`}</li>
        <li>{`Completada ${data.completed}`}</li>
      </ul>
      <Button variant="outlined" onClick={handleBackBtn}>
        Back
      </Button>
    </>
  );
};

export default Details;
