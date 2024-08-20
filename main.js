const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8';
const URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8';
const API = 'https://api.thecatapi.com/v1/favourites';
const API_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8`;
const API_Upload = 'https://api.thecatapi.com/v1/images/upload';
/*fetch(URL)
.then(res => res.json())
.then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;
})*/

document.addEventListener('DOMContentLoaded', loadRandomMichis)
const spanError = document.getElementById('randomMichisError')

async function loadRandomMichis() {
    try{
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);

        if(res.status !== 200){
            spanError.innerHTML = "hubo un error:" + res.status + data.message;
        }else{
            const img1 = document.getElementById('img1');
            const img2 = document.getElementById('img2');
            img1.src = data[0].url;
            img2.src = data[1].url;
            btn1.onclick = () => saveFavoritesMichi(data[0].id);
            btn2.onclick = () => saveFavoritesMichi(data[1].id);
        }
       
    }catch(error){
        console.error(error);
    }
}

async function loadFavouriteMichis() {
    try{
        const res = await fetch(API, {
            method: 'GET',
            headers: {
                'X-API-KEY' : 'live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8',
            }
        });
        const data = await res.json();
        console.log(data);
        if(res.status !== 200){
            spanError.innerHTML = "hubo un error:" + res.status + data.menssage;
        }else {
            const section = document.getElementById('favoritesMichis')
            section.innerHTML = "";
        
            const h2 = document.createElement('h2');
            const h2Text = document.createTextNode('Michis favoritos');
            h2.appendChild(h2Text);
            section.appendChild(h2);
        
            data.forEach(michi => {
              const article = document.createElement('article');
              const img = document.createElement('img');
              const btn = document.createElement('button');
              const btnText = document.createTextNode('Sacar al michi de favoritos');
        
              img.src = michi.image.url;
              img.width = 150;
              btn.appendChild(btnText);
              btn.onclick = () => deleteFavoritesMichi(michi.id);
              article.appendChild(img);
              article.appendChild(btn);
              section.appendChild(article);
            });
          }
    }catch(error){
        console.error(error);
    }
}


async function saveFavoritesMichi(id) {
const {data, status} = await api.post('/favourites',{
    image_id :id,
});

    /*    const res = await fetch(API, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46'
        },
        body:JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();
    console.log('save');
    if(res.status !== 200){
        spanError.innerHTML = "hubo un error:" + res.status;
    }else{
        console.log('Michi guardado en favoritos');
        loadFavouriteMichis();
    }
*/
    console.log('save');
    if(status !== 200){
    spanError.innerHTML = "hubo un error:" + status;
    }else{
    console.log('Michi guardado en favoritos');
    loadFavouriteMichis();
    }
}
async function deleteFavoritesMichi(id){
    const res = await fetch(API_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8',
        }
    });
    const data = await res.json();
    if(res.status !== 200){
        spanError.innerHTML = "hubo un error:" + res.status + data.message;
    }else{
        console.log("michi eliminado de favorios");
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_Upload, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_fct5YdOyitQFEOx7Jzbu7qdRPXym3wPFh1JiUdFL1q8rX3Hj2ixSPk3C56SQezh8'
        },
        body: formData,
    })
    const data = await res.json();
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavoritesMichi(data.id); //para agregar el michi cargado a favoritos.
    }
}

const click = document.querySelector('#click');
click.onclick = loadRandomMichis;
loadRandomMichis();
loadFavouriteMichis();