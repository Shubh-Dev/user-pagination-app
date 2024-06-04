import React from 'react';
import './App.css';
import UserList from './components/UserList'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl text-blue-500 font-bold">Users</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
};

export default App;

