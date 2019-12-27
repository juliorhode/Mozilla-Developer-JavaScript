// Hacemos referencia al elemento canvas
const canvas = document.querySelector('canvas');
// Este objeto representa el area de dibujo del lienzo y nos permite dibujar formas 2D en el
const ctx = canvas.getContext('2d');
// Establecemos el ancho del lienzo por medio de la ventana del navegador (encadenando multiples tareas para configurarlas mas rapido)
const width = canvas.width = window.innerWidth;
// Establecemos el alto del lienzo por medio de la ventana del navegador (encadenando multiples tareas para configurarlas mas rapido)
const height = canvas.height = window.innerHeight;

// Esta funcion toma dos numeros como argumentos y devuleve un numero aleatorio en el rango entre los dos
function aleatorio(min,max) {
    const num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

// Creamos el constructor
function Pelota(x,y,velX,velY,color,tamaño){
    // Coordenadas horizontal y vertical
    this.x = x;
    this.y = y;
    // Velocidad horizontal y vertical
    this.velX = velX;
    this.velY = velY;
    // Color para cada pelota
    this.color = color;
    // Tamaño para cada pelota
    this.tamaño = tamaño;
}
    // Esta funcion va a permitir que la pelota se dibuje en la pantalla
    Pelota.prototype.dibuja = function(){
        // Indicamos que queremos dibujar una forma en el lienzo
        ctx.beginPath();

        // Indicamos de que color queremos que sea la forma (configurada en la propiedad color)
        ctx.fillStyle = this.color;

        // Indicamos que vamos a trazar una forma de arco en el lienzo
        ctx.arc(this.x, this.y, this.tamaño, 0, 2 * Math.PI); // 2 * Math.PI es equivalente a 360 grados en radianes (nos da un circulo completo)... si fuese 1 * Math.PI se obtendria 180 grados, o sea, un semicirculo
        
        // Indicamos que termina de dibujar la ruta que se comenzo con beginPath y llena el area que ocupa con color que se especifico en fillStyle
        ctx.fill();
        /* Vamos a realizar esta prueba por consola del navegador
        
        var prueba = new Pelota(50,100,4,4,'blue',10);
        prueba.color;
        "azul"
        prueba.x;
        50
        prueba.dibuja(); Dibuja la pelota
        */
    }
    // Para poder moverla, necesitamos una funcion de actualizacion
    Pelota.prototype.actualiza = function(){
        // Verificamos si la pelota ha llegado al borde del lienzo. Si es asi, invertimos la polaridad de la velocidad para que la pelota viaje en direccion opuesta. Ejemplo: Si la pelota viajaba hacia arriba(velY positivo) entonces la velocidad vertical cambia para que comience a ir hacia abajo(velY negativo). 

        // Nota: En todos los casos se incluye el tamaño, ya que las coordenadas x/y estan en el centro de la pelota
        // Significa que la pelota se sale del borde derecho
        if ( (this.x + this.tamaño) >= width) {
            this.velX = -(this.velX); 
        }
        // Significa que la pelota se sale del borde izquierdo
        if ( (this.x - this.tamaño) <= 0) {
            this.velX = -(this.velX); 
        }
        // Significa que la pelota se sale del borde superior
        if ( (this.y + this.tamaño) >= height) {
            this.velY = -(this.velY); 
        }
        // Significa que la pelota se sale del borde inferior
        if ( (this.y - this.tamaño) <= 0) {
            this.velY = -(this.velY); 
        }
        // Se agrega el valor de velX a la coordenada x
        this.x += this.velX;
        // Se agrega el valor de velY a la coordenada y
        this.y += this.velY;
    }

    // Verificamos si la pelota actual ha chocado con otra
    Pelota.prototype.detectaColision = function(){
        for(let j = 0; j < pelotas.length; j++){
            // Verificamos si la pelota que estamos evaluando no es la misma
            if( ! (this === pelotas[j])){
                const dx = this.x - pelotas[j].x;
                const dy = this.x - pelotas[j].y;
                // Aqui esta la explicacion para detectar colision entre dos circulos: https://translate.googleusercontent.com/translate_c?depth=1&hl=es&rurl=translate.google.com&sl=auto&sp=nmt4&tl=es&u=https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection&xid=17259,15700002,15700021,15700186,15700191,15700256,15700259,15700262,15700265,15700271,15700283&usg=ALkJrhgza5Y_HPWdUh6HUud99AVnqaOVLg
                const distancia = Math.sqrt(dx * dx + dy * dy);

                // Si se detecta la colision, le damos un nuevo color... Para simulasiones mas realistas se pueden usar bibliotecs de juegos o fisica como PhysicsJS , matter.js , Phaser, etc
                if (distancia < this.tamaño + pelotas[j].tamaño) {
                    pelotas[j].color = this.color = 'rgb(' + aleatorio(0, 255) +',' + aleatorio(0, 255) + ',' + aleatorio(0, 255) + ')';
                }
            }
        }
    }
    let pelotas =[];
    while (pelotas.length < 25) {
        let tamaño = aleatorio(10,20);
        let pelota = new Pelota(
            aleatorio(0 + tamaño, width - tamaño),
            aleatorio(0 + tamaño, height - tamaño),
            aleatorio(-7, 7),
            aleatorio(-7, 7),
            'rgb(' + aleatorio(0, 255) +',' + aleatorio(0, 255) + ',' + aleatorio(0, 255) + ')',
            tamaño
        );
        pelotas.push(pelota);
    }

    function loop(){
        // Colocamos el color de relleno del lienzo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        // Dibujamos un rectangulo en todo lo ancho y alto del lienzo
        ctx.fillRect(0, 0, width, height);
        // Recorremos todas las pelotas creadas
        for(let i = 0; i < pelotas.length; i++){
            // Ejecutamos la funcion para dibujar
            pelotas[i].dibuja();
            // Ejecutamos la funcion para realizar las actualizciones de posicion y velocidad
            pelotas[i].actualiza();
            // Ejecutamos la funcion que verifica la colision
            pelotas[i].detectaColision();
        }
        // requestAnimationFrame informa al navegador que se quiere realizar una animacion y solicita al navegador que programe el repintado de la ventana para el proximo ciclo de animacion. Este metodo acepta como argumento una funcion
        requestAnimationFrame(loop);
    }

    loop();

    
