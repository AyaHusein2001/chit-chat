import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <main>
      {/* render the component u want , outlet from react router */}
      <Outlet />
    </main>
  );
}

export default App;
