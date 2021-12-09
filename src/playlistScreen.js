const playListScreen = document.querySelector("#playlistScreen");
const playListTitle = playListScreen.querySelector(".title");
const playListCover = playListScreen.querySelector(".cover");

const editThumbnailBTN = playListCover.querySelector(".editButton");
const editPlayListModal = playListScreen.querySelector(".editPlayListModal");
const editPlayListModalBtn = editPlayListModal.querySelector(".closeModalBtn");

//inputs
const playListTitleInput = editPlayListModal.querySelector(
  ".modalPanel>#playlistTitleInput"
);
const playListThumbnailInput = editPlayListModal.querySelector(
  ".modalPanel>#playlistThumbnailInput"
);

const playlistContentContainer = editPlayListModal.querySelector(
  ".playlistContent>.playlistContentContainer"
);

let isFetching = false;
let playlistID = "";
let playlistData = {};
let editablePlayListContent = [];

const FetchPlaylist = async (id) => {
  isFetching = true;
  playlistContentContainer.innerHTML = "";
  loadingIndicator.classList.remove("hidden");
  playListThumbnailInput.value = "";
  editablePlayListContent = [];

  db.collection("Playlists")
    .doc(id)
    .get()
    .then((doc) => {
      isFetching = false;
      loadingIndicator.classList.add("hidden");
      if (doc.exists) {
        playlistID = doc.id;
        playlistData = doc.data();

        playListTitle.innerHTML = doc.data().title;
        playListTitleInput.value = doc.data().title;

        if (doc.data().content) renderPlayListContent(doc.data().content);

        playListCover.style.backgroundImage = `url(${doc.data().thumbnail})`;
      } else {
        Redirect("404");
      }
    });
};

const renderPlayListContent = async (contentList) => {
  editablePlayListContent = JSON.parse(JSON.stringify(contentList));
  playlistContentContainer.innerHTML = "";
  for (let i = 0; i < contentList.length; i++) {
    const contentCard = await createContentCard(contentList[i]);
    playlistContentContainer.appendChild(contentCard);
  }
};

const createContentCard = (contentID) => {
  const container = document.createElement("li");
  const name = document.createElement("h2");
  const deleteBtn = document.createElement("img");

  deleteBtn.src = "./resources/icons/closeModal-icon.png";

  deleteBtn.addEventListener("click", () => {
    const elementIndex = editablePlayListContent.findIndex(
      (element) => element == contentID
    );
    if (elementIndex >= 0) {
      editablePlayListContent.splice(elementIndex, 1);
      container.remove();
    }
  });

  container.appendChild(name);
  container.appendChild(deleteBtn);
  return new Promise((resolve, reject) => {
    db.collection("Content")
      .doc(contentID)
      .get()
      .then((doc) => {
        name.innerText = doc.data().title;
        resolve(container);
      })
      .catch((err) => {
        alert(err);
        reject(err);
      });
  });
};

editThumbnailBTN.addEventListener("click", () => {
  editPlayListModal.classList.remove("hidden");
});

editPlayListModalBtn.addEventListener("click", () => {
  if (playlistData.content) renderPlayListContent(playlistData.content);
  editPlayListModal.classList.add("hidden");
});

const SavePlaylist = async () => {
  if (isFetching) {
    alert("Se están sincronizando datos, intente en unos segundos");
    return;
  }

  const title = playListTitleInput.value;

  if (!title) {
    alert("Por favor ingrese un título valido");
    return;
  }

  playlistData.title = title;

  isFetching = true;
  loadingIndicator.classList.remove("hidden");

  const thumbnailFile = playListThumbnailInput.files[0];
  if (thumbnailFile) {
    if (playlistData.thumbnail) await DeleteThumbnail(playlistData.thumbnail);
    playlistData.thumbnail = await UploadThumbnail(thumbnailFile);
  }

  playlistData.content = editablePlayListContent;
  await UploadPlaylist();

  isFetching = false;
  loadingIndicator.classList.add("hidden");
  editPlayListModal.classList.add("hidden");
  Refresh();
};

const UploadPlaylist = () => {
  return new Promise((resolve, reject) => {
    db.collection("Playlists")
      .doc(playlistID)
      .set(playlistData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        alert("Error:" + err.message);
        reject(err);
      });
  });
};

const DeleteThumbnail = (url) => {
  return new Promise((resolve, reject) => {
    let pictureRef = storage.refFromURL(url);
    pictureRef
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        alert(err);
        reject();
      });
  });
};

const UploadThumbnail = (thumbnail) => {
  return new Promise((resolve, reject) => {
    storage
      .ref()
      .child(`Images/PlaylistsThumbnails/${thumbnail.name}`)
      .put(thumbnail)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          resolve(url);
        });
      })
      .catch((err) => {
        alert(err);
        reject();
      });
  });
};
