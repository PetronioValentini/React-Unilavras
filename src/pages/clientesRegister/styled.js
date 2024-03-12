import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  &:focus {
    border: 1px solid ${colors.primaryColor};
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primaryColor};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryDarkColor};
  }
`;
