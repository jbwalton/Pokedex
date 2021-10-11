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
      pokemonList.push(pokemon);
    }
    function getAll() {
      return pokemonList;
    }
    return {
      add: add,
      getAll: getAll,
    };
  })();

//Output PokemonList using the function output
(pokemonRepository.getAll()).forEach(output);
