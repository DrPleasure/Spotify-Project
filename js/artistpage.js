const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b8e9f98f4msh93308b356ec1abbp16f4bajsn71150916a80a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
async function getMusic(){
 const response= await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=queen', options);
 const data= await response.json()
 console.log(typeof data)
 console.log(data.data)
 for(let obj of data.data){
    console.log(obj)
    const table=document.querySelector('#table')
table.innerHTML+=`
<tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>
                        <img src="${obj.artist.picture}" width="50px" height='50px'>
                        </td>
                        <td>${obj.title}</td>
                        <td>1,013,238,772</td>
                        <td>${obj.duration}</td>
                      </tr>
                  <tr>
                </tbody>
`
}

}
getMusic()
// function renderData(song){
// song.forEach((queenSongs) => {
//     console.log(queenSongs)
// });
// }
// window.onload=async()=>{
// const loadData= async function(){
// const data= await getMusic()
// console.log(data)
// }
// data.forEach(obj => {
//     console.log(obj)
// const table=document.querySelector('#table')
// table.innerHTML=`
// <tbody>
//                     <tr>
//                         <th scope="row"></th>
//                         <td><img src="${album.picture_big}" width="50px" height='50px'></td>
//                         <td>${album.tittle}</td>
//                         <td>1,013,238,772</td>
//                         <td>3.34</td>
//                       </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td><img src="/assets/recentlyadded.jpeg" width="50px" height='50px'></td>
//                     <td>Bohemian Rhapsody-Remastered 2011</td>
//                     <td>1,013,238,772</td>
//                     <td>5.54</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td><img src="/assets/recentlyadded.jpeg" width="50px" height='50px'></td>
//                     <td>Don't Stop Me Now-Remastered 2011</td>
//                     <td>1,497,986,258</td>
//                     <td>3.29</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">4</th>
//                     <td><img src="/assets/recentlyadded.jpeg" width="50px" height='50px'></td>
//                     <td>Under Pressure-Remastered 2011</td>
//                     <td>900,225,096</td>
//                     <td>4.08</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">5</th>
//                     <td><img src="/assets/recentlyadded.jpeg" width="50px" height='50px'></td>
//                     <td>We Will Rock You-Remastered 2011</td>
//                     <td>705,225,721</td>
//                     <td>2.02</td>
//                   </tr>
//                 </tbody>
// `

// });
// })
// }

