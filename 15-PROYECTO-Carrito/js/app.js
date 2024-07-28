//variables 

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners()

//funciones

function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso)

    vaciarCarritoBtn.addEventListener('click',limpiarHTML)

    carrito.addEventListener('click',()=>{
        articulosCarrito = []

        limpiarHTML();
    })
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
   }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter (curso => curso.id !==cursoId);

        carritoHTML()
    }
}

function leerDatosCurso(curso){

    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    //revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some (curso => curso.id == infoCurso.id);
    if (existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso; 
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito , infoCurso]
    }
    //agregar elementos al arreglo del carrito 
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en html  

function carritoHTML(){
    //limpiar el HTML 
    limpiarHTML()

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = 
        `
        <td>
        <img src = "${curso.imagen}" width="100">
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        ${curso.cantidad}
        </td>
         <td>
        <a href = "#" class = "borrar-curso" data-id = "${curso.id}"> X </a> 
        </td>
        `;

        //Agrega el HTML del carrito en el Body
        contenedorCarrito.appendChild(row)

    })
}


//Elimina los cursos del Tbody

function limpiarHTML(){
    //forma ineficiente 
    //contenedorCarrito.innerHTML='';


    //forma eficiente 
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}