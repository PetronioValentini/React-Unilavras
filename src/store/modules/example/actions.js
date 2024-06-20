import * as types from '../types';

export function clicaBotaoSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

export function clicaBotaoRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function clicaBotaoFailue() {
  return {
    type: types.BOTAO_CLICADO_FAILUE,
  };
}
