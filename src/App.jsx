import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  const [countries, setCountries] = useState([]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            path="/"
            element={<HomePage countries={countries} setCountries={setCountries} />}
          />
          <Route path="/country/:name" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
