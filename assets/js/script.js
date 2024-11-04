const listaTareas=[{
  id: "16",
  description: "Hacer mercado",
  done: false},
  { id: "60",
    description: "Estudiar para la prueba",
    done: false},
  { id: "24",
    description: "Sacar a pasear a Blu",
    done: false}
]
alert(listaTareas);

function cargarLista(){
  let htmlDatos='';
  for (const elementoTarea of listaTareas) {
    htmlDatos+= `<li>${elementoTarea}</li>`; 
    
  }
  alert (htmlDatos);
  document.querySelector('#todo-list').innerHTML=htmlDatos;  
}

const agregarTarea= function (event){
    const inputTarea= document.getElementById("toDoDescription");

}



// get the selected li index using array
// populate array with li values

for (let i = 0; i < items.length; i++) {
    tab.push(items[i].innerHTML);
}

// get li index onclick
for (let i = 0; i < items.length; i++) {

    items[i].onclick = function() {
        index = tab.indexOf(this.innerHTML);
        console.log(this.innerHTML + " INDEX = " + index);
        // set the selected li value into input text
        inputText.value = this.innerHTML;
    };

}


