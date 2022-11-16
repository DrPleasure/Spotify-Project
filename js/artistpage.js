const Artistpick=document.querySelector('.Artistpick')
const artistpickplaylist=document.querySelector('.artistpickplaylist')
const postedImg=document.querySelector('.postedImg')
const postedby=document.querySelector('.postedby')
const table=document.querySelector('#table')
const currentSong=document.querySelector('.Currentsong')
const currentsongplaylist=document.querySelector('.currentsongplaylist')
const artistId= window.location.search
const search= new URLSearchParams(artistId)
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b8e9f98f4msh93308b356ec1abbp16f4bajsn71150916a80a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
async function getMusic(){
 try {const response= await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=queen', options);
 const data= await response.json()
let artistData=data.data
 console.log(artistData)
 for(let obj of (artistData)){
    console.log(obj)
let tr=document.createElement('tr')
table.innerHTML+=`
                        <th scope="row"></th>
                        <td>
                        <img src="${obj.artist.picture}" width="50px" height='50px'>
                        </td>
                        <td>${obj.title}</td>
                        <td>1,013,238,772</td>
                        <td>${obj.duration}</td>
                  
`
table.append(tr)
}

}catch (error) {
  console.error(error)}
}


async function getAlbum(){
  const data= await fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/412',options);
  const dataFetch= await data.json()
  console.log(dataFetch)
currentSong.innerHTML+=`

             <img src=${dataFetch.picture_xl} width="100%" height="300px"/>
           <div class="monthlylistners">
                <i class="bi bi-patch-check-fill"></i>
                Verified Artist
                <h1>${dataFetch.name}</h1>                
                <p>37,120,733 monthly listners</p>          
                 </div>`         

}












window.onload= async()=>{
 const data= await getMusic()
 const dataFetch= await getAlbum()
}
