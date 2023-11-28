function handleSubmit(data, e) {
  e.preventDefault();

  const img = document.querySelector("img");
  const imgSrc = getImage(data);

  img.src = imgSrc;
}

async function fetchDataAndSetImage() {
  const searchButton = document.querySelector("#search-button");
  const form = document.querySelector("form");

  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();

    form.addEventListener("submit", (e) => handleSubmit(data, e));

    searchButton.addEventListener("click", (e) => handleSubmit(data, e));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getImage(data) {
  const input = document.querySelector("#search-bar");
  const errorMessage = document.querySelector(".error-message");
  const searchInput = input.value.toLowerCase().replace(/'/g, "");

  for (movie of data) {
    const filmTitle = movie.title.toLowerCase().replace(/'/g, "");

    if (filmTitle.includes(searchInput)) {
      errorMessage.style.visibility = "hidden";
      return movie.image;
    }
  }

  errorMessage.style.visibility = "visible";
  return "https://www.ghiblicollection.com/cdn/shop/files/download.webp?v=1687908002&width=1920";
}

fetchDataAndSetImage();
