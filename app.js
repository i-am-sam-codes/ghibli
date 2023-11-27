const img = document.querySelector("img");
const input = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const form = document.querySelector("form");

async function fetchDataAndSetImage() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();
    console.log(data);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formImage = getImage(data);
      img.src = formImage;
    });

    searchButton.addEventListener("click", (e) => {
      e.preventDefault();

      const imageUrl = getImage(data);
      img.src = imageUrl;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getImage(data) {
  const searchInput = input.value.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    const filmTitle = data[i].title.toLowerCase();
    if (filmTitle.includes(searchInput)) {
      return data[i].image;
    }
  }

  return "Not Found";
}

fetchDataAndSetImage();
