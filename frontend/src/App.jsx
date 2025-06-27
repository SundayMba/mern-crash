import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CreatePage } from './pages/CreatePage';
import { HomePage } from './pages/HomePage';

const App = () => {
  return (
    <Box minH={'100vh'}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
