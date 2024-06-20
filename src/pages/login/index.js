import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Title, Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const dispatch = useDispatch();
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErros = false;

    if (usuario === '') {
      formErros = true;
      toast.error('Campo nome esta vazio');
    }
    if (senha === '') {
      formErros = true;
      toast.error('Campo senha esta vazio');
    }
    if (formErros) return;
    dispatch(actions.loginRequest({ usuario, senha }));
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Seu Usuario"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua Senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
