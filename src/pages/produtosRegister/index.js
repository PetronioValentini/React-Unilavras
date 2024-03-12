/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../services/history';
import { Title, Form, Label, Input, Button } from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function ProdutosRegister() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;
    if (nome === '') {
      formErros = true;
      toast.error('Campo nome esta vazio');
    }
    if (descricao === '') {
      formErros = true;
      toast.error('Campo descrição esta vazio');
    }
    if (preco === '') {
      formErros = true;
      toast.error('Campo preço esta vazio');
    }
    if (senha === '') {
      formErros = true;
      toast.error('Campo token esta vazio');
    }
    if (formErros) return;

    try {
      await axios.post('/produtos/', {
        nome,
        descricao,
        preco,
        senha,
      });
      toast.success('Produto registrado com sucesso!');
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
      <Title>Adicionar Novo Produto</Title>
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

        <Button type="submit">Adicionar</Button>
      </Form>
    </Container>
  );
}
