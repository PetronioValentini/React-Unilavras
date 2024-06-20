/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { get } from 'lodash';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form, Label, Input, Button } from './styled';
import history from '../../services/history';
import axios from '../../services/axios';

export default function Cliente({ match }) {
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if (nome === '') {
      formErrors = true;
      toast.error('Campo nome está vazio');
    }
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome === '') {
      formErrors = true;
      toast.error('Campo sobrenome está vazio');
    }
    if (email === '') {
      formErrors = true;
      toast.error('Campo email está vazio');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Campo email inválido');
    }
    if (idade === '') {
      formErrors = true;
      toast.error('Campo idade está vazio');
    }
    if (idade > 120) {
      formErrors = true;
      toast.error('Campo idade deve ser menor que 120 anos');
    }
    if (idade < 0) {
      formErrors = true;
      toast.error('Campo idade deve ser positivo');
    }
    if (senha === '') {
      formErrors = true;
      toast.error('Campo token está vazio');
    }
    if (formErrors) return;

    try {
      await axios.put(`/clientes/${id}`, {
        nome,
        sobrenome,
        email,
        idade,
        senha,
      });
      toast.success('Cliente Editado com sucesso!');
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
      <Title>Editar cliente</Title>

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

        <Button type="submit">Editar</Button>
      </Form>
    </Container>
  );
}

Cliente.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
