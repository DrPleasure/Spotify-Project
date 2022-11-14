// API INTEGRATION

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2a4edcf965msh1f0bb1eb4e8f093p1d4fd8jsne157a33abe8e",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=Psy", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// Function to toggle pause symbol onClick Play-button
$(".fas").click(function () {
  $(".fas").toggleClass("fa-play fa-pause");
});

// Function to toggle filled-heart symbol onClick like-button
$(".bis").click(function () {
  $(".bis").toggleClass("bi-heart bi-heart-fill");
});
