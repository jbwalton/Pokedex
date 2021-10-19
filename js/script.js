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
