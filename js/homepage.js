console.log("O, A, ...");

/*-----------------------------------
DOM elements
-----------------------------------*/
const search = document.getElementById("inputSearch"); // search input
const reset = document.querySelector(".input-group-prepend"); // reset div

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
  const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
  let resp = ``;
  const songs = [];

  try {
    const seeInputValue = async () => {
      // const input = event.target.value;
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
      songs.forEach(({ artist: { picture_medium }, id, title_short, title_version, album }, index) => {
        console.log(album.id);
        const column = document.createElement("div");
        column.className = "col-lg-2 px-1";
        column.innerHTML = `
                      <a href="./albumpage.html?albumId=${id}" class="albumLinks">
                        <div class="card px-3 py-3 mb-3 bg-recentlyPlayed grow" id=div${index}>
                            <img src=${picture_medium} class="card-img-top" alt="..." />
                            <div class="card-body px-0">
                                <h5 class="card-title line-clamp-1">${title_short}</h5>
                                <p class="card-text line-clamp-2">
                                ${title_version}
                                </p>
                            </div>
                        </div>
                      </a>`;
        bandList.appendChild(column);
      });
    };
    search.addEventListener("keyup", seeInputValue);

    // CONDITION TO MAKE SURE AN ARRAY IS PASSED <AND FETCHED>
  } catch (err) {
    console.log("ERROR HAPPENED", err);
    const h2 = document.querySelector("h2");
    h2.classList.add("text-danger");
    h2.innerText = err.message + ", try to refresh the page";
  }
  console.log("LAST LOG");
};
