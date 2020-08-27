const updateProfileName = (newName) => {
  firebase
  .auth()
  .currentUser.updateProfile({displayName: newName,})    
};

export const updateProfile = (user, newName, newMentorship, newLanguages) => {
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({
      userName: newName,
      mentorship: newMentorship,
      languages: newLanguages,
    })
    .then(() => {
      updateProfileName(newName);
      console.log('Edited user successfully!');
    })
    .catch(() => {
      console.error('You cannot cancel this edit');
    });
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
};
