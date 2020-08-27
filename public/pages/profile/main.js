import {
  updateProfile, logout
} from './data.js';

export const profile = (user) => {
  const container = document.createElement('div');
  container.classList.add('container-profile');

    container.innerHTML = `
    <header>
      <nav>
        <div id='menu-bar' class='menu-bar'>
          <div id='menu' class='menu'>
            <div id='bar1' class='bar'></div>
            <div id='bar2' class='bar'></div>
            <div id='bar3' class='bar'></div>
          </div>
          <ul class='nav-home' id='nav-home'>
            <li id='li-profile'><a href='#home'>Feed</a></li>
            <li id='li-logout'><a href=''>Sair</a></li>
          </ul>
        </div>
        <div class='menu-bg' id='menu-bg'></div>
        <div class='menu-desk'>
          ${user.displayName} <a href='#home'><span class='icon-profile'></span></a>
        </div>
        <h1 id='logo-home'>mentor<strong id='strong'>she</strong></h1>
        <label>
          <img src='./img/logout.svg' alt='Ícone de uma porta aberta'>
          <button id='logout'>Sair</button>
        </label>
      </nav>
    </header>
      <section id='user-profile' class='flex center column fullheight info'>
        <figure class='photo-profile'>
          <img src='${user.photoURL}' alt='Foto do perfil'>
        </figure>
        <h2>Perfil</h2>
        <form id='resetForm' class='flex column center'>
          <label for='name'>Nome</label>
          <textarea id='new-name' disabled='disabled' required>${user.displayName}</textarea>
          <label for='name'>O que gostaria de ser? </label>
          <textarea id='mentor-student' disabled='disabled' placeholder='Mentora ou Mentorada' required></textarea>
          <label for='languages'>Linguagens</label>
          <textarea id='languages' disabled='disabled' placeholder='Qual sua linguagem favorita?' required></textarea>
          <div class='update'>
            <button id='edit-profile' type='submit'>Editar</button>
            <button id='cancel' type='submit'>Cancelar</button>
            <button id='save-profile' type='submit'>Salvar</button>
          </div>
        </form>
      </section>
      <footer class='flex center nav-footer'>
        <p>© Desenvolvido por <a href='https://github.com/larissamiyaji'>Larissa</a>, <a href='https://github.com/kellyalves87'>Kelly</a> e <a href='https://github.com/mirescordeiro'>Tamires</a></p>
      </footer>
    `;

    firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot((doc) => {
      container.querySelector('#languages').value = doc.data().languages;
      container.querySelector('#mentor-student').value = doc.data().mentorship;  
    });
  
    const logoutButton = container.querySelector('#logout');
    const menu = container.querySelector('#menu');
    const menuLogout = container.querySelector('#li-logout');
    menu.addEventListener('click', showMenu);
    menuLogout.addEventListener('click', logout);
    logoutButton.addEventListener('click', logout);
    
    function showMenu() {
      container.querySelector('#menu').classList.toggle('change');
      container.querySelector('#nav-home').classList.toggle('change');
      container.querySelector('#menu-bg').classList.toggle('change-bg');
    }

    const newName = container.querySelector('#new-name');
    const mentorship = container.querySelector('#mentor-student');
    const languages = container.querySelector('#languages');
    const editProfile = container.querySelector('#edit-profile');
    const cancelEdit = container.querySelector('#cancel');
    const saveProfile = container.querySelector('#save-profile');
    const resetForm = container.querySelector('#resetForm');

    editProfile.hidden = false;
    editProfile.addEventListener('click', (event) => {
      event.preventDefault();
      editProfile.hidden = true;
      cancelEdit.hidden = false;
      saveProfile.hidden = false;
      newName.disabled = false;
      languages.disabled = false;
      mentorship.disabled = false;

    });

    saveProfile.hidden = true;
    saveProfile.addEventListener('click', (event) => {
      event.preventDefault();
      editProfile.hidden = false;
      cancelEdit.hidden = true;
      saveProfile.hidden = true;
      newName.disabled = true;
      languages.disabled = true;
      mentorship.disabled = true;
      updateProfile(user.uid, newName.value, mentorship.value, languages.value ); 
    });
    
    cancelEdit.hidden = true;
    cancelEdit.addEventListener('click', (event) => {
      event.preventDefault();
      editProfile.hidden = false;
      cancelEdit.hidden = true;
      saveProfile.hidden = true;
      newName.disabled = true;
      languages.disabled = true;
      mentorship.disabled = true;
      resetForm.reset();
    });

  return container;
};
