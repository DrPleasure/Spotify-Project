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
