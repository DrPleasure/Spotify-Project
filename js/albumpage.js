// API INTEGRATION

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2a4edcf965msh1f0bb1eb4e8f093p1d4fd8jsne157a33abe8e",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// Fetch and DOM Manipulation to fill in the table with the songlist including: 1 - track number, 2 - song title + artist, 3 - duration

fetch("https://deezerdevs-deezer.p.rapidapi.com/album/1208585", options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let results = data.results;
    let seconds = data.duration;

    let albumTr = document.createElement(`tr`);
    albumTr.innerHTML = `<tr>
            <th>${data.nb_tracks}</th>
            <td> <span class="table-title"> ${data.title} </span>
            </br>
            ${data.artist.name}
            </td>
            <td> ${secondsConvert(seconds)} </td>
       
          </tr>`;

    let container = document.getElementById(`table-body`);

    container.appendChild(albumTr);
  })

  .catch((err) => console.error(err));

// Fetch and DOM Manipulation to dynamically fill the album page header with album cover image, album, album title, and misc

fetch("https://deezerdevs-deezer.p.rapidapi.com/album/1208585", options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let results = data.results;
    let seconds = data.duration;
    let date = data.release_date;
    let year = date.substring(0, 4);
    console.log(year);

    let albumDiv = document.createElement(`div`);
    albumDiv.innerHTML = ` <div  class="row d-flex">
              <div id="album-image" class="col-3"> <img class="img-fluid" src="${
                data.cover
              }"> </div>
              <div class="col-9 margintop-high lineheight-low"><p>ALBUM</p> </br>
                  <h1> ${data.title} </h1> </br>
                      <div class="row d-flex">
                   <p id="artist"> <img src="${data.artist.picture}" ${
      data.artist.name
    } </p> ᐧ <p id=""> ${year}
      </p> ᐧ <p> ${data.nb_tracks}, ${secondsConvert(seconds)} </p>
                      </div>
              </div>
              
            </div>`;

    let container = document.getElementById(`album-header`);

    container.appendChild(albumDiv);
  })

  .catch((err) => console.error(err));

// Function to toggle pause symbol onClick Play-button
$(".fas").click(function () {
  $(".fas").toggleClass("fa-play fa-pause");
});

// Function to toggle filled-heart symbol onClick like-button
$(".bis").click(function () {
  $(".bis").toggleClass("bi-heart bi-heart-fill");
});

// Function convert seconds to minutes:seconds format
function secondsConvert(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}
