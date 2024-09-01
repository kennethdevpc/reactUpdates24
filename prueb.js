const url = 'https://jsonplaceholder.typicode.com/users';
let loading = true;
let user = [];
let error;
let respuesta;
(async function prueba() {
  console.log('1-se autoejecuto');
  respuesta = await fetch(url)
    .then((response) => {
      console.log('2-entro al response');

      if (!response.ok) {
        //----errores de consulta differentes a 200 , como 300 ,400 ,500, ya que el catch no lee eso
        throw new Error(`${response.status}`); //---lanza un error para que pueda ser leido con el catch
      }
      return response.json();
    })
    .then((data) => {
      console.log('2-b El data user es: ');

      user = data;
    })
    .catch((error) => {
      //----aqui toma los errores del servidor pero si no se hace el "response.ok" no detectaria los 300 , 400 , 500
      error = error.message; //----setea el mensaje
      console.log('2c-El error es', error);
    })
    .finally(() => {
      loading = false;
    });
  console.log('3-por dentro de la funcion');
})();
console.log('4-por fuera)');
// console.log(
//   'La respueta es',
//   respuesta,
//   '\n user',
//   user,
//   '\n loading:',
//   loading,
//   '\n error:',
//   error
// );
