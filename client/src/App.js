import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Toaster />
    <main>
      {/* render the component u want , outlet from react router */}
      <Outlet />
    </main>
    </>
  );
}

export default App;
