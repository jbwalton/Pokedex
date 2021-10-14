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
  let pokemonList = [
  {name:'Bulbasaur',height:.7,type:['grass','poison']},
  {name:'Caterpie',height:.3,type:['bug']},
  {name:'Rattata',height:.3,type:['normal']},
  {name:'Sandslash',height:1,type:['ground']},
  {name:'Vulpix',height:.6,type:['fire']},
  {name:'Paras',height:.3,type:['grass','bug']},
  {name:'Golduck',height:1.7,type:['water']}
  ];

    function add(pokemon) {
      if (typeof(pokemon) === 'object' && 'name','height','type' in pokemon && Object.keys(pokemon).length === 3) {
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
      console.log(pokemon);
    }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
    };
  })();
(pokemonRepository.add({name:'Kadabra',height:1.3,type:['psychic']}));
//Output PokemonList using the function output
(pokemonRepository.getAll()).forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
