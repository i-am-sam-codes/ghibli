const img = document.querySelector("img");
const input = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const form = document.querySelector("form");

function handleSubmit(data, e) {
  console.log("submit");
  e.preventDefault();

  const imgSrc = getImage(data);
  img.src = imgSrc;
}

async function fetchDataAndSetImage() {
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
  const searchInput = input.value.toLowerCase().replace(/'/g, "");

  for (movie of data) {
    const filmTitle = movie.title.toLowerCase().replace(/'/g, "");

    if (filmTitle.includes(searchInput)) return movie.image;
  }

  return "Not Found";
}

fetchDataAndSetImage();
