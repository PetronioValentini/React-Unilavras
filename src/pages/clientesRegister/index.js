/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import history from '../../services/history';
import { Title, Form, Label, Input, Button } from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function ClientesRegister() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error('Campo nome deve ter entre 3 e 255 caracteres');
    }
    if (nome === '') {
      formErros = true;
      toast.error('Campo nome esta vazio');
    }
    if (sobrenome === '') {
      formErros = true;
      toast.error('Campo sobrenome esta vazio');
    }
    if (email === '') {
      formErros = true;
      toast.error('Campo email esta vazio');
    }
    if (!isEmail(email)) {
      formErros = true;
      toast.error('Campo email invalido');
    }
    if (idade === '') {
      formErros = true;
      toast.error('Campo idade esta vazio');
    }
    if (idade > 120) {
      formErros = true;
      toast.error('Campo idade deve ser menor que 120 anos');
    }
    if (idade < 0) {
      formErros = true;
      toast.error('Campo idade deve ser positivo');
    }
    if (senha === '') {
      formErros = true;
      toast.error('Campo token esta vazio');
    }
    if (formErros) return;

    try {
      await axios.post('/clientes/', {
        nome,
        sobrenome,
        email,
        idade,
        senha,
      });
      toast.success('Cliente registrado com sucesso!');
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
      <Title>Adicionar Novo Cliente</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />

        <Label htmlFor="sobrenome">Sobrenome:</Label>
        <Input
          type="text"
          id="sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Digite seu sobrenome"
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        <Label htmlFor="idade">Idade:</Label>
        <Input
          type="number"
          id="idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Digite sua idade"
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
