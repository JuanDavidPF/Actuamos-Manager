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

let isFetching = false;
let playlistID = "";
let playlistData = {};

const FetchPlaylist = (id) => {
  isFetching = true;
  loadingIndicator.classList.remove("hidden");
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

        playListCover.style.backgroundImage = `url(${doc.data().thumbnail})`;
      } else {
        Redirect("404");
      }
    });
};

editThumbnailBTN.addEventListener("click", () => {
  editPlayListModal.classList.remove("hidden");
});

editPlayListModalBtn.addEventListener("click", () => {
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
  playListThumbnailInput.value = "";

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
