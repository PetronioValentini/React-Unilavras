/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form, Label, Input, Button } from './styled';
import history from '../../services/history';
import axios from '../../services/axios';

export default function Produto({ match }) {
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    async function loadProduto() {
      try {
        const response = await axios.get(`/produtos/${id}`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setPreco(response.data.preco);
      } catch (err) {
        toast.error('Erro ao carregar os dados do produto');
      }
    }

    loadProduto();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;

    if (nome.trim() === '') {
      formErros = true;
      toast.error('Campo nome está vazio');
    }
    if (descricao.trim() === '') {
      formErros = true;
      toast.error('Campo descrição está vazio');
    }
    if (preco === '') {
      formErros = true;
      toast.error('Campo preço está vazio');
    }
    if (preco < 0) {
      formErros = true;
      toast.error('Campo preço deve ser positivo');
    }

    if (formErros) return;

    try {
      await axios.put(`/produtos/${id}`, {
        nome,
        descricao,
        preco,
      });

      toast.success('Produto atualizado com sucesso!');
      history.push('/');
    } catch (erro) {
      const errors = get(erro, 'response.status', []);
      toast.error(errors);
    }
  }

  return (
    <Container>
      <Title>Editar Produto</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />

        <Label htmlFor="descricao">Descrição:</Label>
        <Input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite sua descrição"
        />

        <Label htmlFor="preco">Preço:</Label>
        <Input
          type="number"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Digite seu preço"
        />

        <Button type="submit">Editar</Button>
      </Form>
    </Container>
  );
}

Produto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
