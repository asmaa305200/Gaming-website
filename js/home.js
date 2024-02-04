let load = document.querySelector(".loading");
let links = document.querySelectorAll('.menu a');
for (let i = 0; i < links.length; i++){
    links[i].addEventListener('click', function () {
        document.querySelector('.menu .active').classList.remove("active");
        links[i].classList.add("active");

        let category = links[i].getAttribute("data-category");
        console.log(category);
        gaming(category)
    });
}
gaming("mmorpg")

async function gaming(categoryName) {
   load.classList.remove("d-none");
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '248fd9b2e4msh740c6ce84ab3f3fp16d680jsnf01e3204ba89',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options)
    let res = await api.json();
    console.log(res);
   display(res)
   load.classList.add("d-none");
}

function display(apiData) { 

    let box = ``
   for (let i = 0; i < apiData.length; i++){
       let vedioPath = apiData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");

        box +=`
      <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)"  onclick="details(${apiData[i].id})"  class="card h-100 bg-transparent" role="button" >
         <div class="card-body">

            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${apiData[i].thumbnail}" />

             <video muted="true"  preload="none" loop  class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${vedioPath}">
              </video>

            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${apiData[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50">
                  ${apiData[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="info badge-color">${apiData[i].genre}</span>
            <span class="success badge-color">${apiData[i].platform}</span>

         </footer>
      </div>
   </div>
      `;

}
document.getElementById("gameData").innerHTML = box;
}

function startVideo(event) {
   let ved = event.target.querySelector("video");
   ved.classList.remove("d-none");
   ved.muted = true;
   ved.play();
   
}
function stopVideo(event) {
   let ved = event.target.querySelector("video");
   ved.classList.add("d-none");
   ved.muted = true;
   ved.pause();
}

function details(id) { 
   location.href =`./details.html?id=${id}`
}
 
document.querySelector(".logout-btn").addEventListener("click", function () {
    load.classList.remove("d-none");
   location.href = "./index.html";
   localStorage.removeItem("userToken");
    load.classList.add("d-none");
})