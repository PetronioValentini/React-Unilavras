import React, { useEffect, useState } from 'react';
import {
  Title,
  UsuariosContainer,
  StyledTable,
  TableHeader,
  TableCell,
} from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/usuarios');
      setUsuarios(response.data);
    }

    getData();
  }, []);

  return (
    <Container>
      <Title>Usuarios</Title>
      <UsuariosContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Usuario</TableHeader>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.usuario}</TableCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </UsuariosContainer>
    </Container>
  );
}
