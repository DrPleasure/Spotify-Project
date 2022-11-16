const Artistpick=document.querySelector('.Artistpick')
const artistpickplaylist=document.querySelector('.artistpickplaylist')
const postedImg=document.querySelector('.postedImg')
const postedby=document.querySelector('.postedby')
const table=document.querySelector('#table')
const currentSong=document.querySelector('.Currentsong')
const currentsongplaylist=document.querySelector('.currentsongplaylist')
const search= new URLSearchParams(window.location.search)
const artistId= search.get('artistId')
const duration= new URLSearchParams(window.location.search)
let durationId= duration.get('duration')
console.log(durationId)
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b8e9f98f4msh93308b356ec1abbp16f4bajsn71150916a80a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
async function getMusic(){
 try {const response= await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`, options);
 const obj= await response.json()
 const objList=obj.data
 console.log(objList)
 for(let song of objList){
let tr=document.createElement('tr')
table.innerHTML+=`
                        <th scope="row"></th>
                        <td>
                        <img src="${song.album.cover_small
                        }" width="50px" height='50px'>
                        </td>
                        <td>${song.title}</td>
                        <td>${song.rank}</td>
                        <td>${defineDuration(song.duration)}</td>
                  
`
table.append(tr)
}

}catch (error) {
  console.error(error)}
}


async function getAlbum(){
  const data= await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,options);
  const dataFetch= await data.json()
  console.log(dataFetch)
currentSong.innerHTML+=`

             <img src=${dataFetch.picture_xl} width="100%" height="300px"/>
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
}
const defineDuration = (t) => {
  return Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2)
}
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

window.onload= async()=>{
 const data= await getMusic()
 const dataFetch= await getAlbum()
}
