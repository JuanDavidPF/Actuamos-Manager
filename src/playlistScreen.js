const playListScreen = document.querySelector("#playlistScreen");
const playListTitle = playListScreen.querySelector(".title");
const playListCover = playListScreen.querySelector(".cover");

const editThumbnailBTN = playListCover.querySelector(".editButton");
const editPlayListModal = playListScreen.querySelector(".editPlayListModal");
const editPlayListModalBtn = editPlayListModal.querySelector(".closeModalBtn");

let playlistID = {};
let playlistData = {};

const FetchPlaylist = (id) => {
  loadingIndicator.classList.remove("hidden");
  db.collection("Playlists")
    .doc(id)
    .get()
    .then((doc) => {
      loadingIndicator.classList.add("hidden");
      if (doc.exists) {
        playlistID = doc.id;
        playlistData = doc.data();

        playListTitle.innerHTML = doc.data().title;
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

const EditTitle = (title) => {
  db.collection("Playlists")
    .doc(playlistID)
    .set(
      {
        title: title,
      },
      { merge: true }
    )
    .then(() => {
      playListTitle.innerHTML = title;
    });
};

const ChanchedThumbnail = (thumbnailURL) => {
  db.collection("Playlists")
    .doc(playlistID)
    .set(
      {
        title: title,
      },
      { merge: true }
    )
    .then(() => {
      playListTitle.innerHTML = title;
    });
};
