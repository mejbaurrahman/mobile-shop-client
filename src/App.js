import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routers/router';

function App() {
  return (
    <div className=''>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
