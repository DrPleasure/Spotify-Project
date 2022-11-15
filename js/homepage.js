console.log("O, A, ...");

/*-----------------------------------
DOM elements
-----------------------------------*/
const search = document.getElementById("inputSearch"); // search input
const reset = document.querySelector(".input-group-prepend"); // reset div

// console the input value
const seeInputValue = () => {
  // const input = event.target.value;
  const API = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  const input = document.getElementById("inputSearch").value;
  console.log(input);
  const url = `${API}${input}`;
  console.log({ url });
  return url;
};
search.addEventListener("keyup", seeInputValue);

// reset the input value
const resetInput = () => {
  const input = document.getElementById("inputSearch");
  if (input.value !== "") {
    input.value = "";
  }
};
// reset.addEventListener("click", resetInput);

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

// const API_url = search.addEventListener("keyup", seeInputValue);
// console.log({ API_url });

window.onload = async () => {
  // ASYNC AWAIT APPROACH
  //const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=queen`;
  const API_url = search.addEventListener("keyup", seeInputValue);
  try {
    const resp = await fetch(API_URL, options);
    // EXITS THE EXECUTION IN ONE OF THESE TWO THROWINGS
    if (resp.status === 404) throw new Error("resource not found");
    if (!resp.ok) throw new Error("generic error, something wrong with the fetch");
    // IF ERROR IS THROWN NOTHING HERE WILL BE RUNNING
    const band = await resp.json();

    console.log("console.log(band) has the following result: ", band);

    const bandList = document.getElementById("recentlyPlayed");
    bandList.innerHTML = "";

    const songs = band.data;
    console.log({ songs });

    // CONDITION TO MAKE SURE AN ARRAY IS PASSED <AND FETCHED>
    if (!Array.isArray(songs)) throw new Error("You need to pass an array into the function");
    songs.forEach(({ artist: { picture_medium }, id, title_short, title_version }) => {
      const column = document.createElement("div");
      column.className = "col px-1";
      column.innerHTML = `
                        <div class="card px-3 py-3 bg-recentlyPlayed grow" id=${id}>
                            <img src=${picture_medium} class="card-img-top" alt="..." />
                            <div class="card-body px-0">
                                <h5 class="card-title line-clamp-1">${title_short}</h5>
                                <p class="card-text line-clamp-2">
                                ${title_version}
                                </p>
                            </div>
                        </div>`;
      bandList.appendChild(column);
    });
  } catch (err) {
    console.log("ERROR HAPPENED", err);
    const h2 = document.querySelector("h2");
    h2.classList.add("text-danger");
    h2.innerText = err.message + ", try to refresh the page";
  }
  console.log("LAST LOG");
};
