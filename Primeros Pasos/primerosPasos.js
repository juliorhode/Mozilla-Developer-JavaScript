function creaParrafo() {
    // variable para elemento de parrafo
    var para = document.createElement('p');
    // añadimos el contenido que va a tener
    para.textContent = 'Haz hecho click en el boton';
    // lo agregamos al cuerpo del html
    document.body.appendChild(para);
}
// seleccionamos todos los botones
var botones = document.querySelectorAll('button');
// los recorremos y los ponemos a la escucha del evento click 
for (var i = 0;  i < botones.length; i++){
    botones[i].addEventListener('click',creaParrafo);
}