// importamos as funções que iremos testar
import { greeting } from '../public/pages/home/data.js';

describe('Greeting', () => {
  it('Deveria retornar 'Olá Maria! Seja bem vinda!' quando passado 'Maria' como parâmetros', () => {
    const message = 'Olá Maria! Seja bem vinda!';
    expect(greeting('Maria')).toEqual(message);
  });
});
