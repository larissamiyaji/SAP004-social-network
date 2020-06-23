export const updateProfileName = (user, newName) => {
  firebase
    .auth()
    .then((user) => {
      user.updateProfile({displayName: newName,})    
    });
};

/*
.update({
  userName: updateProfileName(newName),
  user: user.uid,
  mentor: false,
  languages: [],
})*/


/*
export const resetEmail = (userResetPassword) => {
  firebase
    .auth()
    .currentUser.EmailAuthProvider.credential(user.email, userResetPassword);
  return resetEmail();
};

export const resetPassword = () => {
  firebase.auth().currentUser.getASecureRandomPassword();
  user
    .updatePassword(newPassword)
    .then(() => {
      console.log("Senha alterada com sucesso!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const updateProfile = (profile, callback) => {
  firebase
    .auth()
    .currentUser.updateProfile({
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    })
    .then(() => {
      updatePostsUser(profile.uid, profile.displayName, callback);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// Logout redirecting to the #login page
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";
    });
};
*/