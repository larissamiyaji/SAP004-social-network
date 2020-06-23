/*import {
  getUserName, getUrlPhoto
} from "./data.js";
*/

export const profile = (user) => {
  const container = document.createElement("div");
  container.classList.add("profile-feed");

    container.innerHTML = `
      <section id='user-profile' class='flex center row-desk data'>
        <figure class="photo-profile">
          <img src='' alt="Foto do perfil">
        </figure>
        <div class="user" class='flex center column data'>
          <h2>Perfil</h2>
          <form class='flex column register'>
            <label for='name'>Nome</label>
            <textarea id='user-name' disabled='disabled' required>${users.userName}</textarea> Tamires Cordeiro
            <label for='email'>Email</label>
            <textarea id='user-mail' disabled='disabled' required>${user.email}</textarea>
            <label for='password'>Nova senha</label>
            <input id='account-pass' type='password' placeholder='mínimo 6 caracteres. Ex: S&nha1' required>
            <span id='pass-alert' class='alert'></span>
            <span id='validation'></span>
            <button id='create-count' type='submit'>CADASTRE-SE</button>
          </form>

        </div>
      </section>
    `;

  //  const newName = 

  const photoProfile = container.querySelector('#photo-profile');
  const updateNameProfile = container.querySelector('#new-name');
  const bioProfile = container.querySelector('#bio');
  const profileName = container.querySelector('#profile');
  const editProfile = container.querySelector('#edit-profile');
  const editPhoto = container.querySelector('edith-photo');
  const cancelEditProfile = container.querySelector('#cancel');
  const saveProfile = container.querySelector('#save-profile');
  const resetUserPassword = container.querySelector('#reset-password');
  const resetUserEmail = container.querySelector('#reset-email');



  /*  editPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    fileProfile();
  }); */

  /*  cancelEditProfile.addEventListener('click', (event) => {
    event.preventDefault();
  });

  saveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    updateProfile();
  });

  resetUserPassword.add('click', (event) => {
    event.preventDefault();
    resetPassword()
  });

  resetUserEmail.addEventListener('click', (event) => {
    event.preventDefault();
    resetEmail();
  }); */

return container;
};