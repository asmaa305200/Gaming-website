let containerData ={};
const idvar = location.search;
const params = new URLSearchParams(idvar);
let id = params.get("id");
console.log(id);

(async function () {
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '248fd9b2e4msh740c6ce84ab3f3fp16d680jsnf01e3204ba89',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
};
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const response = await api.json();
    console.log(response);
    containerData = response;
    displayData()

}
)()

function displayData() {
    let box = `
    <div class="main">
    <div class="layer">
    <div class="divs d-flex py-5">
    <div class="col-lg-4 col-md-12">
   <figure>
      <img src="${containerData.thumbnail}" class="w-100 px-4" alt="details image" />
   </figure>
</div>

<div class="col-lg-8  col-md-12">
   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${containerData.title}</li>
         </ol>
      </nav>
      <h1>${containerData.title}</h1>
      <h3>About ${containerData.title}</h3>
      <p>${containerData.description}</p>
    </div>
   </div>
   </div>

   </div>
</div>
    `;
    document.getElementById("detailsData").innerHTML = box;
    document.body.style.cssText = `background-image:url('${containerData.thumbnail.replace("thumbnail", "background")}');
    background-position:center;
    background-size:cover`;
}