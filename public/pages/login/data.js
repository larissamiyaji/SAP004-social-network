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
  firebase
    .firestore()
    .collection('users').doc(user.uid)
    .set({
      userName: user.displayName,
      user: user.uid,
      mentorship: '',
      languages: '',
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const checkUser = (user) => {
  const load = firebase
  .firestore()
  .collection('users').doc(user.uid)
  load.get().then((doc) => {
    if (!doc.exists) {
      newUser(user);
    }
  });
};
