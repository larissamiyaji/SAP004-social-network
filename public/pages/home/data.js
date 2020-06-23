// Creates new post on collection posts
export const newPost = (user, textareaPost, postPrivate) => {
  firebase
    .firestore()
    .collection("posts")
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
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// Loads all the posts and listens to the new ones
export const loadPosts = (user, callback) => {
  const load = firebase
    .firestore()
    .collection('posts')
    .orderBy('timestamp', 'desc');
  // Listening realtime for new posts
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

// Deletes a post using its id
export const deletePost = (postId) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// Updates the privacy status
export const updatePrivacy = (postId, editPrivacy) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .update({
      privacy: editPrivacy,
    })
    .then(() => {
      console.log("Privacy settings successfully changed!");
    })
    .catch((error) => {
      console.error("Error changing privacy status: ", error);
    });
};

// Increases the number of likes in a post using its id
export const likePost = (postId, userId) => {
  firebase
    .firestore()
    .collection("posts")
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
      //  console.log('error');
    });
};

// Updates the number of likes based on users and post id
const updateLike = (countLike, userArray, postId) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: countLike,
      likeUsers: userArray,
    })
    .then(() => {
      console.log("Like successfully included!");
    })
    .catch((error) => {
      console.error("Error liking document: ", error);
    });
};

// Updates the text from a post using its id
export const updateEdit = (postId, textareaPost) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .update({
      text: textareaPost,
    })
    .then(() => {
      console.log("Edit post successfully!");
    })
    .catch(() => {
      console.error("You cannot cancel this edit!");
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
