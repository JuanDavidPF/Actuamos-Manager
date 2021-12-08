const contentScreen = document.querySelector("#contentScreen");
const contentCardContainer = contentScreen.querySelector(
  ".contentCardContainer"
);

const CreateCard = ({ id, thumbnail, title, content }) => {
  //create container
  const card = document.createElement("div");
  card.classList.add("contentCard");

  //create thumbnail
  const thumbnailDiv = document.createElement("div");
  thumbnailDiv.classList.add("thumbnail");
  thumbnailDiv.style.backgroundImage = `url(${thumbnail})`;
  card.appendChild(thumbnailDiv);

  //create label
  const label = document.createElement("h1");
  label.innerHTML = title;
  card.appendChild(label);

  //add card to the dom
  contentCardContainer.appendChild(card);
  //add click listener to the card
  card.addEventListener("click", () => {
    Redirect(`/content/playlist/${id}`);
  });
};

const FecthPlaylists = () => {
  contentCardContainer.innerHTML = null;
  loadingIndicator.classList.remove("hidden");
  db.collection("Playlists")
    .get()
    .then((playlists) => {
      loadingIndicator.classList.add("hidden");
      playlists.forEach((playlist) => {
        CreateCard({ id: playlist.id, ...playlist.data() });
      });
    });
};
