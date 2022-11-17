const Artistpick=document.querySelector('.Artistpick')
const artistpickplaylist=document.querySelector('.artistpickplaylist')
const postedImg=document.querySelector('.postedImg')
const postedby=document.querySelector('.postedby')
const table=document.querySelector('#table')
const currentSong=document.querySelector('.Currentsong')
const currentsongplaylist=document.querySelector('.currentsongplaylist')
const card=document.querySelector('#cardrow')
const search= new URLSearchParams(window.location.search)
const artistId= search.get('artistId')
const fixedImage = document.getElementById("fixedImage")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b8e9f98f4msh93308b356ec1abbp16f4bajsn71150916a80a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
async function getMusic(){
 try{const response= await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`,options);
 const obj= await response.json()
 console.log(obj)
obj.data.forEach((songs,index) => {
  let tr=document.createElement('tr')
  table.innerHTML+=`
                          <th scope="row">${index+1}</th>
                          <td>
                         <img src="${songs.album.cover_small}" width="50px" height='50px'>
                          </td>
                          <td>${songs.title}</td>
                          <td>${songs.rank}</td>
                          <td>${defineDuration(songs.duration)}</td>
                    
  `
  table.append(tr)

});

}catch (error) {
  console.error(error)}

}

const albumsButton=document.querySelector('#albums')
albumsButton.addEventListener('click',()=>{
 fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`,
    options
  )
  .then((response)=>response.json())
  .then((data) => {
    console.log(data.data);
      for(let listResult of data.data){
        console.log(listResult)
      card.innerHTML+=`
      <div class="col-3 mb-3">
      <div id='cardinfo'class="card">
      <a href='https://rateyourmusic.com/artist/wizkid'><img src="${listResult.album.cover_xl
      }" class="card-img-top img-fluid" alt="..."></a>
      <div class="card-body">
        <h5 class="card-title">${listResult.title}</h5>
        <p class="card-text">${listResult.album.type}</p>
      </div>
    </div>
      `
  
  }
})
})



async function getAlbum(){
  const data= await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,options);
  const dataFetch= await data.json()
  console.log(dataFetch)
try {currentSong.innerHTML+=`

          <img src='${dataFetch.picture_xl}' alt='artist image cover' class='img-fluid'/>
           <div class="monthlylistners">
                <i class="bi bi-patch-check-fill"></i>
                Verified Artist
                <h1>${dataFetch.name}</h1>                
                <p>${dataFetch.nb_fan} monthly listners</p>          
                 </div>`         
                 artistpickplaylist.innerHTML=`
 <img src="${dataFetch.picture_small}">
 `
 postedImg.innerHTML=`
 <div class="postedImg">
            <img src="${dataFetch.picture_small}">
            Posted By ${dataFetch.name}
            </div>
 `
 postedby.innerHTML=`
 <h6>Best of ${dataFetch.name}</h6>
            <p>Playlist</p>
 `
} catch (error) {
  console.error(error)}
}


const appendTitles = (id, title, imageLink) => {
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
};

const defineDuration = (t) => {
  return Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2)
}


window.onload= async()=>{
 const obj= await  getMusic() 
 const dataFetch= await getAlbum()
}
