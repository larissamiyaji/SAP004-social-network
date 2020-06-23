import {
  newPost,
  loadPosts,
  deletePost,
  likePost,
  logout,
  updateEdit,
  updatePrivacy,
} from "./data.js";

export const home = (user) => {
  const container = document.createElement("div");
  container.classList.add("container-home");

  container.innerHTML = ` 
    <header>
      <nav>
        <div id="menu-bar">
        <div id="menu">
          <div id="bar1" class="bar"></div>
          <div id="bar2" class="bar"></div>
          <div id="bar3" class="bar"></div>
        </div>
        <ul class="nav-home" id="nav-home">
          <li id="li-profile"><a href="#profile">Perfil</a></li>
          <li id="li-logout"><a href="">Sair</a></li>
        </ul>
        </div>
        <div class="menu-bg" id="menu-bg"></div>
        <h1 id='logo-home'>mentor<strong id='strong'>she</strong></h1>
        <label>
          <img src='./img/logout.svg' alt="Ícone de uma porta aberta">
          <button id='logout'>Sair</button>
        </label>
      </nav>
    </header>
    <div class='flex space row-desk'>
      <div class='flex'>
        <section class='profile'>
          <div class='background'>
            <figure>
              <img src='https://firebasestorage.googleapis.com/v0/b/social-network-2b0a2.appspot.com/o/background.png?alt=media&token=8090072e-059b-4894-8656-ce8d944ce970' alt='Fundo violeta com símbolos a esquerda: estrelas, bolinhas'>
            </figure>
          </div>
          <div class='photo-name'>
            <figure>
              <img src='${user.photoURL}' alt='Foto da usuária'>
              <figcaption>${user.displayName}</figcaption>
            </figure>
          </div>
        </section>
      </div>
      <div class='flex'>
        <section class='news'>
          <form id='post-form' class='post'>
            <textarea name='post' id='post-text' placeholder='Compartilhe Conhecimento!'></textarea>
            <div class='post-options'>
              <div class='privacy'>
                <label>PRIVADO</label>
                <label class="switch">
                  <input type="checkbox" id="privacy">
                  <span class="slider round"></span>
                </label>
              </div>
              <button id='publish' type='submit'>Compartilhar</button>
            </div>
          </form>
          <section id='timeline'></section>
        </section>
      </div>
    </div>
    `;

  // Menu Hambúrguer
  const menu = container.querySelector("#menu");
  const menuLogout = container.querySelector('#li-logout');
  menu.addEventListener("click", showMenu);
  menuLogout.addEventListener("click", logout);

  function showMenu() {
    container.querySelector("#menu").classList.toggle("change");
    container.querySelector("#nav-home").classList.toggle("change");
    container.querySelector("#menu-bg").classList.toggle("change-bg");
  }

  // Container variables
  const resetForm = container.querySelector("#post-form");
  const textPost = container.querySelector("#post-text");
  const postButton = container.querySelector("#publish");
  const postPrivate = container.querySelector("#privacy");
  const timeline = container.querySelector("#timeline");

  const postTemplate = (array) => {
    timeline.innerHTML = "";

    array
      .map((post) => {
        const template = document.createElement("div");
        template.classList.add("flex");

        template.innerHTML = `        
        <form id='template-form' class='all-posts'>
          <div class='top'>
            <figure>
              <img src="${post.photoURL}" alt="Foto da usuária">
              <figcaption>${post.userName}</figcaption>
            </figure>
            <div class='edit'>
              <button id='edit-button' type='submit'>EDITAR</button>
              <button id='cancel-edit' type='submit'>CANCELAR</button> 
              <button id='save-edit' type='submit' data-postid=${post.id}>SALVAR</button>
            </div>
          </div>
          <div class='text'>
            <textarea id='edit-text-area' disabled='disabled' rows='1'>${post.text}</textarea>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid=${post.id}><span class='icon-like'></span></button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <div id='private' class='private'>
              <div class='privacy'>
                <label>PRIVADO</label>
                <label class="switch">
                  <input type="checkbox" id="editPrivacy" data-postid=${post.id}>
                  <span class="slider round"></span>
                </label>
              </div>
              <button id='delete-post' class='delete' data-postid=${post.id}><span class='icon-delete'></span></button>
            </div>
          </div>
        </div>
      </form>
        `;
        
        // Template variables
        const resetFormTemplate = template.querySelector("#template-form");
        const privateBtns = template.querySelector("#private");
        const editButton = template.querySelector("#edit-button");
        const cancelEditBtn = template.querySelector("#cancel-edit");
        const saveEditBtn = template.querySelector("#save-edit");
        const editTextArea = template.querySelector("#edit-text-area");
        const likeButton = template.querySelector("#like-button");
        const deletePostBtn = template.querySelector("#delete-post");
        const editPrivacy = template.querySelector("#editPrivacy");      

        // Identifies if the currentUser has editing privileges
        function loggedUser() {
          if (user.uid === post.user) {
            editButton.hidden = false;
            cancelEditBtn.hidden = true;
            saveEditBtn.hidden = true;
            privateBtns.style.visibility = "visible";
          } else {
            editButton.hidden = true;
            cancelEditBtn.hidden = true;
            saveEditBtn.hidden = true;
            privateBtns.style.visibility = "hidden";
          }
        };

        // Enables the textarea to edit the post
        editButton.addEventListener("click", (event) => {
          event.preventDefault();
          editButton.hidden = true;
          cancelEditBtn.hidden = false;
          saveEditBtn.hidden = false;
          editTextArea.disabled = false;
        });

        // Cancels the editing and resets text
        cancelEditBtn.addEventListener("click", (event) => {
          event.preventDefault();
          editButton.hidden = false;
          cancelEditBtn.hidden = true;
          saveEditBtn.hidden = true;
          editTextArea.disabled = true;
          resetFormTemplate.reset();
        });

        // Saves editing changes to the database
        saveEditBtn.addEventListener("click", (event) => {
          event.preventDefault();
          editButton.hidden = false;
          cancelEditBtn.hidden = true;
          saveEditBtn.hidden = true;
          updateEdit(saveEditBtn.dataset.postid, editTextArea.value);
          editTextArea.disabled = true;
          resetForm.reset();
        });

        // Likes the post and deslikes on second click
        likeButton.addEventListener("click", (event) => {
          event.preventDefault();
          likePost(likeButton.dataset.postid, user.uid);
        });

        // Deletes the post when clicked
        deletePostBtn.addEventListener("click", (event) => {
          event.preventDefault();
          deletePost(deletePostBtn.dataset.postid);
        });

        // Verifies privacy and updates its status
        const privacyChecked = () => {
          if (post.privacy != true) {
            editPrivacy.checked = false;
          } else {
            editPrivacy.checked = true;
          }
        };

        editPrivacy.addEventListener("change", (event) => {
          event.preventDefault();
          updatePrivacy(editPrivacy.dataset.postid, editPrivacy.checked);
        });

        // Autoresizes the textarea
        function resizeTextArea() {
          timeline.querySelectorAll("textarea").forEach((text) => {
            text.style.height = "auto";
            text.style.height = text.scrollHeight + "px";
          });
        };

        loggedUser();
        resizeTextArea();
        privacyChecked();

        // Push into the timeline
        timeline.appendChild(template);
      })
      .join("");
  };

  // Refresh timeline
  loadPosts(user, postTemplate);

  // Generates new post when clicked
  postButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (textPost.value === "") return;
    newPost(user, textPost.value, postPrivate.checked);
    textPost.value = "";
    timeline.innerHTML = "";
    loadPosts(user, postTemplate);
    resetForm.reset();
  });

  // Logout when clicked
  const buttonLogout = container.querySelector("#logout");
  buttonLogout.addEventListener("click", logout);
  return container;
};
