//Define function output to write the Pokemon List by item
function output(item) {
  document.write(item.name+" (height: "+item.height+") ");
  if (item.height >=.7) {
    document.write(" - Wow, that's big <br>");
  }else{
    document.write("<br>");
  }
};

//Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
// modalContainer
    function showModal(pokemon) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = 'Name: '+ pokemon.name;

      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: '+ pokemon.height;

      let pokemontypes="";
      //Following code loops through pokemon types array and puts it in the variable pokemontypes
      for (let i=0; i< pokemon.types.length; i++){
        console.log(pokemon.types[i]);
        //adds the current element to pokemontypes
        pokemontypes += pokemon.types[i].type.name;
        // if there are still more elements in the array, add a comma.
        if (i+1 <pokemon.types.length){
          pokemontypes += ", ";
        }
      }
      // puts the contents of pokemontype to the typesElement innertext
      let typesElement = document.createElement('p');
      typesElement.innerText = 'Types: ' + pokemontypes;


      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);

      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(contentElement);

      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);


      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }


    function add(pokemon) {
      if (typeof(pokemon) === 'object' && 'name','detailsUrl' in pokemon)  {
        pokemonList.push(pokemon);
      }
    }
    function getAll() {
      return pokemonList;
    }
    function addListItem(pokemon){
      let pokemonList=document.querySelector('.pokemon-list');
      let listpokemon=document.createElement('li');
      let button=document.createElement('button');
      button.innerText=pokemon.name;
      button.classList.add('button-class');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click', function(){
        showDetails(pokemon)
      });
    }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
      console.log(pokemon);
      showModal(pokemon);
      });
    }

    function loadList(){
      return fetch(apiUrl).then(function (response){
        return response.json();
      }).then(function(json){
        json.results.forEach(function (item){
          let pokemon={
            name: item.name, detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item){
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function(details){
        //now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e){
        console.error(e);
      });
    }
    window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

pokemonRepository.loadList().then(function(){
  //now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
