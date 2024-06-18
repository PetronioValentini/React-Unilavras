// PERMITE APENAS O PATH EXATO
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import myRoute from './myRoute';
import Home from '../pages/home';
import Clientes from '../pages/clientes';
import ClientesRegister from '../pages/clientesRegister';
import ClientesEdit from '../pages/clientesEdit';
import Produtos from '../pages/produtos';
import ProdutosRegister from '../pages/produtosRegister';
import ProdutosEdit from '../pages/produtosEdit';
import Page404 from '../pages/Page404';
import Login from '../pages/login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/clientes" component={Clientes} />
      <Route exact path="/clientes/register/" component={ClientesRegister} />
      <Route exact path="/clientes/edit/:id" component={ClientesEdit} />
      <Route exact path="/produtos" component={Produtos} />
      <Route exact path="/produtos/register/" component={ProdutosRegister} />
      <Route exact path="/produtos/edit/:id" component={ProdutosEdit} />
      <Route exact path="/login" component={Login} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
