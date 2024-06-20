import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import {
  Title,
  ProdutosContainer,
  StyledTable,
  TableHeader,
  TableCell,
  Container1,
  IconCell,
  NovoProduto,
} from './styled';

import axios from '../../services/axios';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/produtos');
      setProdutos(response.data);
    }

    getData();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`/produtos/${id}/`);
      window.location.reload();
    } catch (error) {
      toast.error('Erro');
    }
  };

  return (
    <Container1>
      <Title>Produtos</Title>
      <NovoProduto to="/produtos/register">Cadastrar novo produto</NovoProduto>
      <ProdutosContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Descrição</TableHeader>
              <TableHeader>Preço</TableHeader>
              <TableHeader>Data atualizado</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell>R$ {produto.preco}</TableCell>
                <TableCell>
                  {format(new Date(produto.data_atualizado), 'dd/MM/yyyy')}
                </TableCell>
                <IconCell>
                  <Link to={`/produtos/edit/${produto.id}/`}>
                    <FaEdit size={16} />
                  </Link>
                  <span> </span>
                  <Link
                    onClick={(e) => handleDelete(e, produto.id)}
                    to={`/produtos/${produto.id}/`}
                  >
                    <FaWindowClose size={16} />
                  </Link>
                </IconCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </ProdutosContainer>
    </Container1>
  );
}
