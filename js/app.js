// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agregar un nuevo tweet
    formulario.addEventListener( 'submit', agregarTweet );

    // Cuando el documento se carga
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        crearHTML();
    })
}


// Funciones
function agregarTweet ( e ) {

    e.preventDefault();
    
    // Textarea donde el usuario escribe

    const tweet = document.querySelector( '#tweet' ).value;

    // Validacion
    if( tweet === '') {
        mostrarError( 'No puede ir vacio' );
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet,
    }

    // Agregar el arreglo de tweets
    tweets = [ ...tweets, tweetObj ];

    // Se crea el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar error

function mostrarError( error ) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en el contenido el error
    const contenido = document.querySelector('#contenido');

    // Solo se muestra un error
    if( document.getElementsByClassName('error').length < 1 ) {

        contenido.appendChild( mensajeError );

        // Elimina la alerta despues de 3 segundos
        setTimeout(() => {
        mensajeError.remove();
    }, 3000);

    }
}

// Muestra una listado de los tweets
function crearHTML() {
    limpiarHTML();
    if( tweets.length > 0 ){
        tweets.forEach( tweet => {
            // Agregar un boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Agregar la funcion eliminar
            btnEliminar.onclick = () => {
                borrarTweet( tweet.id );
            }

            // Crear el HTML
            const li = document.createElement('li');

            // Agregar el texto
            li.innerHTML = tweet.texto;

            // Asignar el boton
            li.appendChild( btnEliminar );

            // Insertar en el HTML
            listaTweets.appendChild( li );
        })
    }
    sincronizarStorage();
}

// Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify( tweets ) );
}

// Elimina un tweet
function borrarTweet( id ) {
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while( listaTweets.firstChild ){
        listaTweets.removeChild( listaTweets.firstChild );
    }
}