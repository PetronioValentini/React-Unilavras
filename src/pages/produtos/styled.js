import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container1 = styled.section`
  max-width: 1500px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ProdutosContainer = styled.div`
  margin-top: 20px;
  max-width: 1500px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const IconCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

export const NovoProduto = styled(Link)`
  display: block;
  padding: 15px 0;
`;
