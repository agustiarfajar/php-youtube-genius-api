const searchButton = document.querySelector('#searchButton');
const cari = document.getElementById("cari");
const result = document.getElementById("result");
// document.body.style.backgroundImage = 'url(img/sky.jpg)'
function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        inputKeyword = cari.value.trim();
        
        // getVideo(inputKeyword);
        getListLirik(inputKeyword);
    }
}

searchButton.addEventListener('click', function() {
    inputKeyword = cari.value.trim();

    // getVideo(inputKeyword);
    getListLirik(inputKeyword);
})

// klik Lihat Lirik
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    // cek element apakah button atau bukan
    if(clickedElement.tagName === 'SPAN')
    {
        const lyrics = clickedElement.getAttribute('data-lyrics');
        
        getLirik(lyrics);
    }
})

function getListLirik(id)
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c03ae4baf6mshb24184fc38c86d9p1dc2bejsn9785ff236cb3',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search/multi?q='+id+'&per_page=5&page=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.meta.status == 200)
            {
                result.innerHTML = `<h2>Lirik yang tersedia: </h2>
                <ol class="list-group list-group-numbered">`;
                for(let i=0;i<response.response.sections[1].hits.length;i++)
                {
                    result.innerHTML += `
                    
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">${response.response.sections[1].hits[i].result.full_title}</div>
                                
                            </div>
                            <span style="cursor:pointer" class="badge bg-secondary" data-lyrics="${response.response.sections[1].hits[i].result.id}">
                                Lihat Lirik
                            </span> 
                        </li> `;
                } 
                result.innerHTML += `</ol>`;
            } else {
                return `Something went wrong: ${data}`;
              }
        })
        .catch(err => console.error(err));
}

async function getLirik(id)
{
    // alert(id);
      const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c03ae4baf6mshb24184fc38c86d9p1dc2bejsn9785ff236cb3',
            'X-RapidAPI-Host': 'genius.p.rapidapi.com'
        }
    };
    
    fetch('https://genius.p.rapidapi.com/songs/'+id+'', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            result.innerHTML = `
            <h2>Lihat Lirik</h2>
            <span class="badge bg-primary"><a target="_blank" href="https://genius.com${response.response.song.path}" style="text-decoration:none;color:white">Lihat Lirik di <u>Genius</u></a></span>`;
        })
        .catch(err => console.error(err));
}

function getVideo(id)
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