// API INTEGRATION

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2a4edcf965msh1f0bb1eb4e8f093p1d4fd8jsne157a33abe8e",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch("https://deezerdevs-deezer.p.rapidapi.com/album/5942207", options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let results = data.results;

    let albumTr = document.createElement(`tr`);
    albumTr.innerHTML = `<tr>
            <th>${data.nb_tracks}</th>
            <td> <span class="table-title"> ${data.title} </span>
            </br>
            ${data.artist.name}
            </td>
            <td> ${data.duration} </td>
       
          </tr>`;

    let container = document.getElementById(`table-body`);

    container.appendChild(albumTr);
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
