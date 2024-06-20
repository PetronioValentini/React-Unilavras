import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Painel, ButtonContainer } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container>
      <Title>Bar do Gustavo</Title>

      <ButtonContainer>
        <Link to="/clientes">
          <Painel>Clientes</Painel>
        </Link>
        <Link to="/produtos">
          <Painel>Produtos</Painel>
        </Link>
        <Link to="/usuarios">
          <Painel>Usuarios</Painel>
        </Link>
      </ButtonContainer>
    </Container>
  );
}
