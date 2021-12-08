const playListScreen = document.querySelector("#playlistScreen");
const playListTitle = playListScreen.querySelector(".title");
const playListCover = playListScreen.querySelector(".cover");

const FetchPlaylist = (playlistID) => {
  loadingIndicator.classList.remove("hidden");
  db.collection("Playlists")
    .doc(playlistID)
    .get()
    .then((doc) => {
      loadingIndicator.classList.add("hidden");
      if (doc.exists) {
        playListTitle.innerHTML = doc.data().title;
        playListCover.style.backgroundImage = `url(${doc.data().thumbnail})`;
      } else {
        Redirect("404");
      }
    });
};
