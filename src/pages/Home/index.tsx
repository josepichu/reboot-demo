import React, { FC } from 'react';
import TodoList from './components/TodoList';

const Home: FC = () => {
  const [state, setState] = React.useState(0);

  const grid = React.useMemo(() => <TodoList />, []);

  return (
    <>
      <h2>TodoList mock with useMemo</h2>

      <h3 onClick={() => setState(prevState => prevState + 1)}>
        {`click me !: counter: ${state}`} (This state update will not produces
        any Todo list grid rendering because is wrapped by useMemo hook)
      </h3>

      {grid}
    </>
  );
};

export default Home;
