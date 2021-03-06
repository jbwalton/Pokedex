

//Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
// modalContainer
    function showModal(pokemon) {
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');
      modalTitle.innerText = '';
      modalBody.innerText = '';

      //create element for name in modal
      let  nameElement= document.createElement('h1');
      nameElement.innerText = pokemon.name;
      nameElement.classList.add('name-element');

      let loaderElement = document.createElement('p');
      loaderElement.classList.add('loader');

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      imageElement.classList.add('modal-img');



      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: '+ pokemon.height;

      let pokemontypes='';
      //Following code loops through pokemon types array and puts it in the variable pokemontypes
      for (let i=0; i< pokemon.types.length; i++){
        //adds the current element to pokemontypes
        pokemontypes += pokemon.types[i].type.name;
        // if there are still more elements in the array, add a comma.
        if (i+1 <pokemon.types.length){
          pokemontypes += ', ';
        }
      }
      // puts the contents of pokemontype to the typesElement innertext
      let typesElement = document.createElement('p');
      typesElement.innerText = 'Types: ' + pokemontypes;
      typesElement.classList.add('typesElement');


      modalTitle.append(nameElement);
      //modalBody.append(loaderElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(typesElement);
      // waits for image to be completely loaded before showing modalcontainer
      imageElement.addEventListener("load", event => {
        //var image = document.querySelector('img');
        //var isLoaded = image.complete && image.naturalHeight !== 0;
        if (imageElement.complete && imageElement.naturalHeight !== 0){
          modalContainer.classList.add('is-visible');
          }
        });

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
      button.addEventListener('click', function(){
        showDetails(pokemon)
      });
      button.innerText=pokemon.name;
      button.classList.add('btn', 'btn-sucess', 'button-class');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal-container');
      listpokemon.classList.add('list-group-item');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

    }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
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
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e){
        console.error(e);
      });
    }

    // checks for escape key
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
  let pokemonSearchBar = document.querySelector('#filter');

    pokemonSearchBar.addEventListener('input', function() {
      let pokeListItem = document.querySelectorAll('li');
      let filter = pokemonSearchBar.value.toUpperCase();

      pokeListItem.forEach(function(pokemon){
        if (pokemon.innerText.toUpperCase().indexOf(filter) > -1) {
          pokemon.style.display = 'block';
        } else {
          pokemon.style.display = 'none';
        }
      });
    });
    return {
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,

    };
  })();

pokemonRepository.loadList().then(function(){
  //now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
