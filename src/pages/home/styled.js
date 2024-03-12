import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  padding: 20px;
`;

export const Painel = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${primaryColor};
  cursor: pointer;
  margin: 0 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;
