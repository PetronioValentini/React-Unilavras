import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import {
  Title,
  ClientesContainer,
  StyledTable,
  TableHeader,
  TableCell,
  IconCell,
  NovoCliente,
} from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/clientes');
      setClientes(response.data);
    }

    getData();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    const token = prompt('Digite o token para excluir o cliente:');
    try {
      await axios.delete(`/clientes/${id}/`, {
        data: { senha: token },
      });
      window.location.reload();
    } catch (error) {
      const status = get(error, 'response.status', 0);
      if (status === 401) {
        toast.error('Token incorreto.');
      }
    }
  };

  return (
    <Container>
      <Title>Clientes</Title>
      <NovoCliente to="/clientes/register">Cadastrar novo cliente</NovoCliente>
      <ClientesContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Sobrenome</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Idade </TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.sobrenome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.idade}</TableCell>
                <IconCell>
                  <Link to={`/clientes/edit/${cliente.id}/`}>
                    <FaEdit size={16} />
                  </Link>
                  <span> </span>
                  <Link
                    onClick={(e) => handleDelete(e, cliente.id)}
                    to={`/clientes/${cliente.id}/`}
                  >
                    <FaWindowClose size={16} />
                  </Link>
                </IconCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </ClientesContainer>
    </Container>
  );
}
