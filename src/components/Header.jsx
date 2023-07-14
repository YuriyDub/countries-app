import { useState, useEffect } from 'react';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from './Container';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: (--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

const Title = styled(Link).attrs({ to: '/' })`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.75rem;
  text-transform: capitalize;
`;

export const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Countries-App</Title>
          <ModeSwitcher onClick={toggleTheme}>
            {theme === 'light' ? <IoMoonOutline size="14px" /> : <IoMoon size="14px" />}
            {theme} Theme
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
