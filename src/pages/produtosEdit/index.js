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
  const [senha, setSenha] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    async function loadProduto() {
      const response = await axios.get(`/produtos/${id}`);
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setPreco(response.data.preco);
      setData(response.data.data);
    }

    loadProduto();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;

    const startDate = new Date('2000-01-01');
    const endDate = new Date('2024-06-30');
    const inputDate = new Date(data);

    if (nome === '') {
      formErros = true;
      toast.error('Campo nome está vazio');
    }
    if (descricao === '') {
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
    if (senha === '') {
      formErros = true;
      toast.error('Campo token está vazio');
    }
    // eslint-disable-next-line no-restricted-globals
    if (data === '' || isNaN(inputDate.getTime())) {
      formErros = true;
      toast.error('Campo data está vazio ou inválido');
    } else if (inputDate < startDate || inputDate > endDate) {
      formErros = true;
      toast.error(
        'A data deve estar entre 1 de Janeiro de 2000 e 30 de Junho de 2024'
      );
    }

    if (formErros) return;

    try {
      await axios.put(`/produtos/${id}`, {
        nome,
        descricao,
        preco,
        senha,
        data,
      });
      toast.success('Produto atualizado com sucesso!');
      history.push('/');
    } catch (erro) {
      const errors = get(erro, 'response.status', []);
      if (errors === 401) {
        toast.error('Token incorreto.');
      } else {
        toast.error(errors);
      }
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

        <Label htmlFor="senha">Token:</Label>
        <Input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite seu token"
        />

        <Label htmlFor="data">Data:</Label>
        <Input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Digite a data"
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
