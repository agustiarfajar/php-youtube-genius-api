const form = document.getElementById("formz");
const cari = document.getElementById("cari");
const result = document.getElementById("result");
const youtube = document.getElementById("youtube");

const apiURL = "https://api.lyrics.ovh";

form.addEventListener('submit', e=>{
    e.preventDefault();
    searchValue = cari.value.trim();

    // cek pencarian apabila kosong
    if(!searchValue)
    {

    } 
    else 
    {
        showVideo(searchValue);
        searchSong(searchValue);
    } 
    
})

// cari lagu

async function searchSong(searchValue)
{
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
    
    showData(data);
}

// TAMPIL LIRIK

function showData(data)
{
    result.innerHTML = `
        <h2>Lirik yang tersedia: </h2>
        <ol class="list-group list-group-numbered">
            ${data.data.map(song=> `            
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${song.artist.name}</div>
                    ${song.title}
                </div>
                <span style="cursor:pointer" class="badge bg-secondary" data-artist="${song.artist.name}" data-songtitle="${song.title}">
                    Lihat Lirik
                </span> 
            </li>`
            ).join('')
        }
        </ol>
    `;
}

function showVideo(id)
{
    // KEPERLUAN YOUTUBE 
    const YOUTUBE_API_KEY = "AIzaSyBli-47FqDFAnVTK_ZzItRcADLtF_c4d8U";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${id}&key=${YOUTUBE_API_KEY}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data.items[0].id.videoId);
        //console.log above is to help access proper data in the JSON
        //object
        //set iframe source to proper URL (notice same dynamic strings 
        //used above)
        youtube.innerHTML = `<h2>Video Youtube: </h2>`;
        for(let i = 0; i < data.items.length; i++)
        {
            youtube.innerHTML += `
            <div class="col-md-6">
                <div class="card">
                <iframe src="https://www.youtube.com/embed/${data.items[i].id.videoId}" width="100%" height="325" allowfullscreen></iframe><br><br>
                    <div class="card-body">
                        <h5 class="card-title">${data.items[i].snippet.title}</h5>
                    </div>
                </div>
            </div>
            `;
        }
    });
}

// klik Lihat Lirik
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    // cek element apakah button atau bukan
    if(clickedElement.tagName === 'SPAN')
    {
        const artist = clickedElement.getAttribute('data-artist');
        const songtitle = clickedElement.getAttribute('data-songtitle');
        
        getLirik(artist, songtitle);
    }
})

// fungsi melihat lirik
async function getLirik(artist, songtitle)
{
    const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
    const data = await res.json();

    if(data.error)
    {
        result.innerHTML = `<h2>
            <strong>Oops maaf! Lirik tidak tersedia</strong>                   
        </h2>`;   
    } else 
    {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        result.innerHTML = `<h2>
            <strong>${artist}</strong> - ${songtitle}</strong>                    
        </h2>
        <p>${lyrics}</p>`;
    }
}

