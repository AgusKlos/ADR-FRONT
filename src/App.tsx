import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsTable from './pages/ContactsTable';
import ContactForm from './pages/ContactForm';
import { theme } from './styles/theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<ContactsTable />} />
            <Route path="/add" element={<ContactForm />} />
            <Route path="/edit/:id" element={<ContactForm />} />
          </Routes>
        </AppContainer>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
