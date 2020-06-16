import { handleSignUp } from './data.js';

export const newAccount = () => {
  const container = document.createElement('div');
  container.classList.add('container-login');

  container.innerHTML = `<section id="new-account" class="flex center row-desk data">
    <figure>
      <img src="./img/register.svg" alt="Ilustração de monitor e dois usuários" class="desktop">
    </figure>
    <div class="flex center column data">
      <h2>Criar uma nova conta</h2>
      <form class="flex column register">
        <label for="name">Nome</label>
        <input id="user-name" type="text" placeholder="Maria Carneiro" required>
        <label for="email">Email</label>
        <input id="account-user" type="email" placeholder="email@host.com.br" required>
        <span id="email-alert" class="alert"></span>
        <label for="password">Senha</label>
        <input id="account-pass" type="password" placeholder="mínimo 8 caracteres" required>
        <span id="pass-alert" class="alert"></span>
        <span id=validation></span>
      </form>
      <button id="create-count" type="submit">CADASTRE-SE</button>
      <p class="footer">Já tem uma conta? <a href="#login">Acesse agora</a></p>
    </div>
  </section>`;

  const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const strongPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-6])))(?=.{6,})/;
  const createButton = container.querySelector('#create-count');
  const validationPass = container.querySelector('#pass-alert');
  const validationMail = container.querySelector('#email-alert');
  const validation = container.querySelector('#validation');

  createButton.addEventListener('click', () => {
    const invalidPass = [];
    const invalidEmail = [];
    const invalidFirebase = [];
    validation.innerText = '';
    validationMail.innerText = '';
    validationPass.innerText = '';

    const errorFirebase = (error) => {
      if (error) {
        invalidFirebase.push(error);
        validation.innerHTML = invalidFirebase.join('');
      }
    };

    const email = document.querySelector('#account-user').value;
    const password = document.querySelector('#account-pass').value;
    const name = document.querySelector('#user-name').value;

    if (!mailformat.test(email)) {
      invalidEmail.push('Email inválido! Verifique se o mesmo foi digitado corretamente.');
    }
    if (!strongPass.test(password)) {
      invalidPass.push('Sua senha deve conter no mínimo 6 caracteres, 1 número, 1 letra maíuscula e 1 carácter especial!');      
    }

    if (invalidPass.length > 0 || invalidEmail.length > 0) {
      validationPass.innerHTML = invalidPass.join('');
      validationMail.innerHTML = invalidEmail.join('');
    } else {
      handleSignUp({ email, password, name }, errorFirebase);
    }
  });

  return container;
};
