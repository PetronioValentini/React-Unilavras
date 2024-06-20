// PERMITE APENAS O PATH EXATO
import React from 'react';
import { Switch } from 'react-router-dom';
import MyRoute from './myRoute';
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
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/clientes" component={Clientes} isClosed />
      <MyRoute
        exact
        path="/clientes/register/"
        component={ClientesRegister}
        isClosed
      />
      <MyRoute
        exact
        path="/clientes/edit/:id"
        component={ClientesEdit}
        isClosed
      />
      <MyRoute exact path="/produtos" component={Produtos} />
      <MyRoute exact path="/produtos/register/" component={ProdutosRegister} />
      <MyRoute exact path="/produtos/edit/:id" component={ProdutosEdit} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
