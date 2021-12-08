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

let isFetching = false;
let playlistID = {};
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

const SavePlaylist = () => {
  if (isFetching) {
    alert("Se están sincronizando datos, espere");
    return;
  }
  loadingIndicator.classList.remove("hidden");
  const title = playListTitleInput.value;

  if (!title) {
    alert("Por favor ingrese un título valido");
    return;
  }
  playlistData.title = title;

  isFetching = true;
  db.collection("Playlists")
    .doc(playlistID)
    .set(playlistData)
    .then(() => {
      isFetching = false;
      loadingIndicator.classList.add("hidden");
      editPlayListModal.classList.add("hidden");
      Refresh();
    });
};
