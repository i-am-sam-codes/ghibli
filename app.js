async function init() {
  const searchButton = document.querySelector("#search-button");
  const form = document.querySelector("form");

  const data = await fetchData();

  form.addEventListener("submit", (e) => handleSubmit(data, e));
  searchButton.addEventListener("click", (e) => handleSubmit(data, e));
}

async function fetchData() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function handleSubmit(data, e) {
  e.preventDefault();

  const img = document.querySelector("img");
  const description = document.querySelector(".description");
  const errorMessage = document.querySelector(".error-message");

  const info = getInfo(data);

  img.src = info.image;
  img.classList.add("border");
  errorMessage.style.display = "none";

  switch (info.status) {
    case "ok":
      console.log("ok");
      description.style.visibility = "visible";
      description.textContent = info.description;
      return;

    case "error":
      console.log("error");
      errorMessage.style.display = "block";
      description.style.display = "none";
      return;

    case "none":
    default:
      console.log("none");
      description.style.visibility = "hidden";
      img.classList.remove("border");
      return;
  }
}

function getInfo(data) {
  const input = document.querySelector("#search-bar");
  const inputValue = input.value.toLowerCase().replace(/'/g, "");

  if (!inputValue) {
    return {
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1920px-Studio_Ghibli_logo.svg.png",
      description: "",
      status: "none",
    };
  }

  for (movie of data) {
    const filmTitle = movie.title.toLowerCase().replace(/'/g, "");

    if (filmTitle.includes(inputValue)) return { ...movie, status: "ok" };
  }

  return {
    image:
      "https://www.ghiblicollection.com/cdn/shop/files/download.webp?v=1687908002&width=1920",
    status: "error",
  };
}

init();
