// Login with email
export const toggleSignIn = ({ email, password }, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      callback(user);
      checkUser(user);
    })
    .catch((error) => {
      callback(error);
    });
};

// Login with Google account
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((user) => {
      window.location.hash = 'home';
      checkUser(user.user);
    });
};

// Login with GitHub account
export const loginGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('user');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((user) => {
      window.location.hash = 'home';
      checkUser(user.user);
    });
};

export const newUser = (user) => {
  console.log(user);
  firebase
    .firestore()
    .collection('users').doc(user.uid)
    .set({
      userName: user.displayName,
      user: user.uid,
      mentor: false,
      languages: [],
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const checkUser = (user) => {
  console.log(user);
  const load = firebase
  .firestore()
  .collection('users').doc(user.uid)
  load.get().then((doc) => {
    if (!doc.exists) {
      newUser(user);
    }
  });
};