/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function loadCliente() {
      try {
        const response = await axios.get(`/clientes/${id}`);
        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
      } catch (err) {
        toast.error('Erro ao carregar os dados do cliente');
      }
    }

    loadCliente();
  }, [id]);

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
    if (formErrors) return;

    try {
      await axios.put(`/clientes/${id}`, {
        nome,
        sobrenome,
        email,
        idade,
      });
      toast.success('Cliente editado com sucesso!');
      history.push('/');
    } catch (erro) {
      const errors = get(erro, 'response.status', []);
      toast.error(errors);
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

        <Button type="submit">Editar</Button>
      </Form>
    </Container>
  );
}

Cliente.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
