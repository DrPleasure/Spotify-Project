console.log("O, A, ...");

const storage = [];
const albumsArray = [];

/*-----------------------------------
DOM elements
-----------------------------------*/
const search = document.getElementById("inputSearch"); // search input
const reset = document.querySelector(".input-group-prepend"); // reset div
const sidebarTitles = document.getElementById("sidebarList"); // sidebar title list
const goodMorning = document.getElementById("goodMorning"); // good morning div

const seeAllBtnAlbum = document.getElementById("seeAllAlbum"); // seeAll for Album
const seeAllBtnArtist = document.getElementById("seeAllArtist"); // seeAll for Artist

const fixedImage = document.getElementById("fixedImage"); // image in the sticky div
const fixedTitle = document.getElementById("fixedTitle"); // first p in the sticky div
const fixedBand = document.getElementById("fixedBand"); // second p in the sticky div

// reset the input value
const resetInput = () => {
  const input = document.getElementById("inputSearch");
  if (input.value !== "") {
    input.value = "";
  }
};
reset.addEventListener("click", resetInput);

/*-----------------------------------
FETCH
-----------------------------------*/
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZmQyYWQ0YmUzZDAwMTU4NDYwMzgiLCJpYXQiOjE2NjgwODcwODIsImV4cCI6MTY2OTI5NjY4Mn0.VtbiHHI8R5YkZzRvBB0wBIO4SqtTZr10KGYVPHIVfOc",
  },
};

window.onload = async () => {
  // ASYNC AWAIT APPROACH
  // const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  // let resp = ``;
  // const songs = [];

  try {
    onWindowLoad();
    search.addEventListener("keyup", seeAlbumValue);
    search.addEventListener("keyup", seeArtistValue);
    search.addEventListener("keyup", seeRandomAlbums);

    // CONDITION TO MAKE SURE AN ARRAY IS PASSED <AND FETCHED>
  } catch (err) {
    console.log("ERROR HAPPENED", err);
    const h2 = document.querySelector("h2");
    h2.classList.add("text-danger");
    h2.innerText = err.message + ", try to refresh the page";
  }
  console.log("LAST LOG");
};

// on window load
const onWindowLoad = async () => {
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=queen`;
  let resp = ``;
  const input = document.getElementById("inputSearch").value;
  const endpoint = `${input}`;
  resp = await fetch(`${API_URL}${endpoint}`, options);

  // EXITS THE EXECUTION IN ONE OF THESE TWO THROWINGS
  if (resp.status === 404) throw new Error("resource not found");
  if (!resp.ok) throw new Error("generic error, something wrong with the fetch");
  // IF ERROR IS THROWN NOTHING HERE WILL BE RUNNING
  const band = await resp.json();

  console.log("console.log(band) has the following result: ", band);

  const albumList = document.getElementById("albums");
  albumList.innerHTML = "";

  const artistList = document.getElementById("artist");
  artistList.innerHTML = "";

  const albumSongs = band.data;
  console.log({ albumSongs });
  if (!Array.isArray(albumSongs)) throw new Error("You need to pass an array into the function");
  albumSongs.forEach(({ album: { id, cover_big, title, type, cover_small }, duration }, index) => {
    console.log(id);
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1";
    column.innerHTML = `
                  <a href="./albumpage.html?albumId=${id}" target=”_blank” class="albumLinks" onclick="appendTitles('${id}','${title}','${cover_big}', '${duration}')">
                    <div class="card px-3 py-3 mb-3 bg-recentlyPlayed grow" id=div${index}>
                        <img src=${cover_big} class="card-img-top" alt="..." />
                        <div class="card-body px-0">
                            <h5 class="card-title line-clamp-1">${title}</h5>
                            <p class="card-text line-clamp-2">
                            ${type}
                            </p>
                        </div>
                    </div>
                  </a>`;
    albumList.appendChild(column);
    const obj = {
      title: `${title}`,
      image: `${cover_small}`,
    };
    albumsArray.push(obj);
  });

  const artistSongs = band.data;
  console.log({ artistSongs });

  if (!Array.isArray(artistSongs)) throw new Error("You need to pass an array into the function");
  artistSongs.forEach(({ album: { id, cover_big, title, type, cover_small }, duration }, index) => {
    console.log(id);
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1";
    column.innerHTML = `
                  <a href="./albumpage.html?albumId=${id}" target=”_blank” class="albumLinks" onclick="appendTitles('${id}','${title}','${cover_big}', '${duration}')">
                    <div class="card px-3 py-3 mb-3 bg-recentlyPlayed grow" id=div${index}>
                        <img src=${cover_big} class="card-img-top" alt="..." />
                        <div class="card-body px-0">
                            <h5 class="card-title line-clamp-1">${title}</h5>
                            <p class="card-text line-clamp-2">
                            ${type}
                            </p>
                        </div>
                    </div>
                  </a>`;
    artistList.appendChild(column);
    const obj = {
      title: `${title}`,
      image: `${cover_small}`,
    };
    albumsArray.push(obj);
  });
};

// album
const seeAlbumValue = async () => {
  // const input = event.target.value;
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  let resp = ``;
  //const songs = [];
  const input = document.getElementById("inputSearch").value;

  console.log(input);
  const endpoint = `${input}`;
  console.log({ endpoint });
  resp = await fetch(`${API_URL}${endpoint}`, options);
  console.log({ resp });
  // EXITS THE EXECUTION IN ONE OF THESE TWO THROWINGS
  if (resp.status === 404) throw new Error("resource not found");
  if (!resp.ok) throw new Error("generic error, something wrong with the fetch");
  // IF ERROR IS THROWN NOTHING HERE WILL BE RUNNING
  const band = await resp.json();

  console.log("console.log(band) has the following result: ", band);

  const bandList = document.getElementById("albums");
  bandList.innerHTML = "";

  const songs = band.data;
  console.log({ songs });
  if (!Array.isArray(songs)) throw new Error("You need to pass an array into the function");
  songs.forEach(({ album: { id, cover_big, title, type, cover_small }, duration }, index) => {
    console.log(id);
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1";
    column.innerHTML = `
                  <a href="./albumpage.html?albumId=${id}" target=”_blank” class="albumLinks" onclick="appendTitles('${id}','${title}','${cover_big}', '${duration}')">
                    <div class="card px-3 py-3 mb-3 bg-recentlyPlayed grow" id=div${index}>
                        <img src=${cover_big} class="card-img-top" alt="..." />
                        <div class="card-body px-0">
                            <h5 class="card-title line-clamp-1">${title}</h5>
                            <p class="card-text line-clamp-2">
                            ${type}
                            </p>
                        </div>
                    </div>
                  </a>`;
    bandList.appendChild(column);
    const obj = {
      title: `${title}`,
      image: `${cover_small}`,
    };
    albumsArray.push(obj);
  });
};

// artist
const seeArtistValue = async () => {
  // const input = event.target.value;
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  let resp = ``;
  //const songs = [];
  const input = document.getElementById("inputSearch").value;
  console.log(input);
  const endpoint = `${input}`;
  console.log({ endpoint });
  resp = await fetch(`${API_URL}${endpoint}`, options);
  console.log({ resp });
  // EXITS THE EXECUTION IN ONE OF THESE TWO THROWINGS
  if (resp.status === 404) throw new Error("resource not found");
  if (!resp.ok) throw new Error("generic error, something wrong with the fetch");
  // IF ERROR IS THROWN NOTHING HERE WILL BE RUNNING
  const band = await resp.json();

  console.log("console.log(band) has the following result: ", band);

  const bandList = document.getElementById("artist");
  bandList.innerHTML = "";

  const songs = band.data;
  console.log({ songs });

  if (!Array.isArray(songs)) throw new Error("You need to pass an array into the function"); // we make sure that the parameter of Array.isArray is always an array
  songs.forEach(({ artist: { id, picture_big, link, name }, duration }, index) => {
    console.log(id);
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-1";
    column.innerHTML = `
                  <a href="./artistpage.html?artistId=${id}&duration=${duration}" target=”_blank” class="albumLinks" onclick="appendTitles('${id}','${name}','${picture_big}', '${duration}')">
                    <div class="card px-3 py-3 mb-3 bg-recentlyPlayed grow" id=div${index}>
                        <img src=${picture_big} class="card-img-top" alt="..." />
                        <div class="card-body px-0">
                            <h5 class="card-title line-clamp-1">${name}</h5>
                            <p class="card-text line-clamp-2">
                            ${link}
                            </p>
                        </div>
                    </div>
                  </a>`;
    bandList.appendChild(column);
  });
};

// append clicked titles to the "sidebarTitles" element
// +
// after each click the image in the sticky div is updated
// with the relevant src
const appendTitles = (id, title, imageLink, duration) => {
  let text = ``;
  const li = document.createElement("li");
  li.className = "sidebar-items sidebar-text";
  li.innerText = `${title}`;
  text = li.innerText;
  sidebarTitles.appendChild(li);

  console.log("local storage: ", localStorage.setItem(`${id}`, `${title}`));
  storage.push(localStorage);
  console.log({ storage });

  fixedImage.src = `${imageLink}`;
  fixedTitle.innerText = `${title}`;
  fixedBand.innerText = `${duration} min`;
};

//SEE ALL - toggle
const toggleSeeAllAlbum = () => {
  const div = document.getElementById("albums");
  div.classList.toggle("overflow-grid");
};
const toggleSeeAllArtist = () => {
  const div = document.getElementById("artist");
  div.classList.toggle("overflow-grid");
};
seeAllBtnAlbum.addEventListener("click", toggleSeeAllAlbum);
seeAllBtnArtist.addEventListener("click", toggleSeeAllArtist);

// GOOD MORNING section

const random = () => {
  const rand = Math.floor(Math.random() * 7);
  console.log({ rand });
  return rand;
};
random();

const seeRandomAlbums = async () => {
  // const input = event.target.value;
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  let resp = ``;
  //const songs = [];
  const input = document.getElementById("inputSearch").value;
  console.log(input);
  const endpoint = `${input}`;
  console.log({ endpoint });
  resp = await fetch(`${API_URL}${endpoint}`, options);
  console.log({ resp });
  // EXITS THE EXECUTION IN ONE OF THESE TWO THROWINGS
  if (resp.status === 404) throw new Error("resource not found");
  if (!resp.ok) throw new Error("generic error, something wrong with the fetch");
  // IF ERROR IS THROWN NOTHING HERE WILL BE RUNNING
  const band = await resp.json();

  console.log("console.log(band) has the following result: ", band);

  const goodMorningList = document.getElementById("goodMorning");
  goodMorningList.innerHTML = "";

  const songs = band.data;
  console.log({ songs });

  const randomIndex = random();

  const slicedArray = songs.slice(randomIndex, randomIndex + 12);

  console.log({ slicedArray });
  if (!Array.isArray(slicedArray)) throw new Error("You need to pass an array into the function");
  slicedArray.forEach(({ album: { id, cover_small }, title_short, duration }, index) => {
    const container = document.createElement("div");
    container.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 justify-content-start mb-3 grow";
    container.innerHTML = `
                            <img class="img-fluid img-goodMorning" src=${cover_small} alt=""  onclick="appendTitles('${id}','${title_short}','${cover_small}', '${duration}')"/>
                            <div class="mb-0 bg-goodMorning flex-align-center pl-2 line-clamp-1" onclick="appendTitles('${id}','${title_short}','${cover_small}', '${duration}')">${title_short}</div>`;
    goodMorningList.appendChild(container);
    const obj = {
      title: `${title_short}`,
      image: `${cover_small}`,
    };
    albumsArray.push(obj);
  });
};
// search.addEventListener("keyup", seeRandomAlbums);
