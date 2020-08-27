export const newPost = (user, textareaPost, postPrivate) => {
  firebase
    .firestore()
    .collection('posts')
    .add({
      userName: user.displayName,
      photoURL: user.photoURL,
      user: user.uid,
      text: textareaPost,
      likes: 0,
      likeUsers: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      privacy: postPrivate,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const loadPosts = (user, callback) => {
  const load = firebase
    .firestore()
    .collection('posts')
    .orderBy('timestamp', 'desc');
  load.onSnapshot((querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      if (!doc.data().privacy || doc.data().user === user.uid) {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    callback(posts);
  });
};

export const deletePost = (postId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const updatePrivacy = (postId, editPrivacy) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      privacy: editPrivacy,
    })
    .then(() => {
      console.log('Privacy settings successfully changed!');
    })
    .catch((error) => {
      console.error('Error changing privacy status: ', error);
    });
};

export const likePost = (postId, userId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .get()
    .then((doc) => {
      const userIds = doc.data().likeUsers;
      let likes = doc.data().likes;

      if (userIds.includes(userId)) {
        likes -= 1;
        const index = userIds.findIndex((elem) => elem === userId);
        userIds.splice(index, 1);
      } else {
        likes += 1;
        userIds.push(userId);
      }

      updateLike(likes, userIds, postId);
      updateEdit(userIds, postId);
    })
    .catch((error) => {
      console.error('Error');
    });
};

const updateLike = (countLike, userArray, postId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      likes: countLike,
      likeUsers: userArray,
    })
    .then(() => {
      console.log('Like successfully included!');
    })
    .catch((error) => {
      console.error('Error liking document: ', error);
    });
};

export const updateEdit = (postId, textareaPost) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      text: textareaPost,
    })
    .then(() => {
      console.log('Edit post successfully!');
    })
    .catch(() => {
      console.error('You cannot cancel this edit!');
    });
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
