// GET URLS

const params = new URLSearchParams(window.location.search).get("albumId");

/* const q = parseInt(params.get("id")); // is the number 123 */

console.log(params);

// API INTEGRATION

const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczOGE4NjNhN2ZjNDAwMTU5N2VjMzAiLCJpYXQiOjE2Njg1MTgwODIsImV4cCI6MTY2OTcyNzY4Mn0.ipvXFSEjwvKS-fHtYA6nLPawiy4Nh2gO6-lqu-ZMOkI",
  },
};

// Fetch and DOM Manipulation to fill in the table with the songlist including: 1 - track number, 2 - song title + artist, 3 - duration

window.onload = async () => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${params}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let results = data;

      console.log(results);

      for (let i = 0; i < results.tracks.data.length; i++) {
        let song = results.tracks.data[i];
        console.log(song);

        let seconds = song.duration;

        let albumTr = document.createElement(`tr`);
        albumTr.innerHTML = `<tr>
            <th>${[i] * 1 + 1}</th>
            <td> <span class="table-title"> ${song.title} </span>
            </br> <a style="color: white" href="homepage.html" <p>
             ${song.artist.name} </p> </a>
            </td>
            <td> ${secondsConvert(seconds)} </td>
       
          </tr>`;

        let container = document.getElementById(`table-body`);

        container.appendChild(albumTr);
      }
    })

    .catch((err) => console.error(err));
};
// Fetch and DOM Manipulation to dynamically fill the album page header with album cover image, album, album title, and misc

fetch(
  `https://striveschool-api.herokuapp.com/api/deezer/album/${params}`,
  options
)
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
              <div id="album-image" class="col-3"> <img id="cover-photo" class="img-fluid"  src="${
                data.cover_medium
              }"> </div>
              <div id="album-info" class="col-8  lineheight-low"><p style="font-size: 20px; font-weight: bold"; >ALBUM</p> </br>
                  <h1> ${data.title} </h1> </br>
                       <div class="row  d-flex" id="album-data">
                   <p id="artist"> <img src="${
                     data.artist.picture
                   }"> <a href="homepage.html"> ${
      data.artist.name
    } </a> · </p>  <p id=""> ${year} ·
      </p>  <p> ${data.nb_tracks} songs, <span id="opaque"> ${secondsToHms(
      seconds
    )}. </span> </p>
                      </div>
              </div>
              
            </div>`;

    let container = document.getElementById(`album-header`);

    container.appendChild(albumDiv);
  })

  .catch((err) => console.error(err));

// function to display artist name dynamically at the cards list
fetch(
  `https://striveschool-api.herokuapp.com/api/deezer/album/${params}`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let anchorTag = document.createElement(`div`);
    anchorTag.innerHTML = `  <div  class="row col-12 d-flex justify-content-between mt-2 text-deco">
    <a class="text-deco-none" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >   <h2 class="more-by" >More by ${data.artist.name} </h2> </a>
    <a  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> <h4 class="more-by" style="opacity: 0.5">SEE DISCOGRAPHY</h4></a> 
  </div>  `;

    let container = document.getElementById(`record-info`);

    container.appendChild(anchorTag);
  });

// <a class="text-deco-none" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >   <h2  >More by</h2> </a>

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

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hr ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";

  return hDisplay + mDisplay;
}

// Let an <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> element be in the document
/*
const anchor = document.getElementById("myAnchor");
const queryString = anchor.search; // Returns:'?q=123'

// Further parsing:

const params = new URLSearchParams(window.location.search);
const q = parseInt(params.get("id")); // is the number 123
*/
