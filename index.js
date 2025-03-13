
function removeActiveClass(){
    const activeBtn = document.getElementsByClassName('active');
    for(let btn of activeBtn){
        btn.classList.remove('active');
    }
    

}






function loadCatagori(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(response=> response.json())
    .then(data => displayCatagori(data.categories))
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then(data => {
        removeActiveClass();
        const allBtn=document.getElementById('btn-all');
        allBtn.classList.add('active');
        displayVideos(data.videos)
    })
}

function loadCatagoriVideos(id){
const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
console.log(url)

fetch(url)
.then(response => response.json())
.then(data =>{
    removeActiveClass();
    const clickedBtn=document.getElementById(`btn-${id}`);
    clickedBtn.classList.add('active');
    displayVideos(data.category)
})
};


function displayCatagori(catagories){
    const catagoriContainer = document.getElementById('catagori-container');

    for(let cat of catagories){
        const catagoriDiv=document.createElement("div");
        catagoriDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCatagoriVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        
        `;
        catagoriContainer.appendChild(catagoriDiv);
    }

   
}
const loadVideoDitails=(videoId)=>{
    console.log(videoId);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then(response=> response.json())
    .then(data=>displayVideosDitails(data.video))
}

const displayVideosDitails=(video)=>{
    console.log(video);
    document.getElementById("video-details").showModal();

}
    

const displayVideos=(videos)=>{
    console.log(videos)
const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML = '';

if(videos.length===0){
    videoContainer.innerHTML=`
    <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
    <img class="w-[120px]" src="Icon.png" alt="">
    <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
</div>
    
    `
    return;
}

videos.forEach((video)=>{

    const videoDiv=document.createElement("div");
    videoDiv.innerHTML=`
  
         <div class="card bg-base-100">
            <figure class="relative ">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
         
            <div class=" flex gap-3 px-0 py-5">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
             </div>
             <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-400 flex">${video.authors[0].profile_name} <img class="w-5 h-5"  src="https://img.icons8.com/?size=48&id=FNbnqlDTjR45&format=gif" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views}</p>
             </div>
            </div>
            <button onclick="loadVideoDitails('${video.video_id}')"class="btn btn-block">Show Details</button>
          </div>
    `;
    videoContainer.appendChild(videoDiv);
})
}


loadCatagori();












