import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './globals.css';

export const metadata = {
  title: 'Cataholic',
  description: 'Find cat images',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <ToastContainer
          position="top-right"
          draggable
          autoClose={1500}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          role="alert"
          aria-live="assertive"
        />
      </body>
    </html>
  );
}
