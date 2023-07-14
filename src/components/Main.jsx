import { styled } from 'styled-components';
import { Container } from './Container';

const Wrapper = styled.main`
  padding: 2rem 0;
  @media (min-width: 767px) {
    padding: 2rem 0;
  }
`;

export const Main = ({ children }) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};
