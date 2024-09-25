# 1. Configuración en VS Code

### Settings:

- **Format on Save:** Activar.
- **Default Formatter:** Seleccionar Prettier.

### Extensiones:

- **Autorename Tag:** Cambia etiquetas de apertura y cierre automáticamente.
- **ES7+ React/Redux/React-Native snippets:** Autocompletar export default.

### Ejecutando el archivo:

    3:35:39 p. m. [vite] hmr update /src/Titulo.tsx
    HMR (Hot Module Reload): Detecta cambios en el DOM y actualiza.

### Convenciones:

- **Funciones:** Usar PascalCase o UpperCamelCase para componentes.

### Selección de texto:

- **Presionar CTRL + D** para seleccionar múltiples instancias de texto.

# 2. Uso de Vite

- **React:** Monitorea cambios en el DOM y comunica con ReactDOM

# 3. creando proyecto:

```bash
  npm create vite@5.2.3
  cd react-app
  npm install
  npm run dev
```

# 4. Me dirijo a

- #### u: ` react-app\src\App.tsx`

```jsx
// Esto es código JSX que será transformado a través de react.createElement, creando esto al HTML en el servidor.
// Si voy a Babel.js, "Babel es un compilador (o transpilador) para JavaScript."

function App() {
  return <h1>Hola mundo</h1>;
}

export default App;
```

# 5. para pasarle variables:

```jsx
function App() {
return <h1>Hola {variable va en llaves o "Curly brackets"}</h1>;
}
export default App;
```

# 6. Llamando un Componente

- #### n: creo un componente:

- #### u: ` react-app\src\Titulo.tsx`

```jsx
function Titulo() {
  const nombre = 'kenneth';
  if (nombre) {
    return <h1>hola {nombre}</h1>;
  }
  return <h1>Hola mundo</h1>;
}

export default Titulo;
```

## 6.1) lo importo en la aplicacion principal

- #### u: ` react-app\src\App.tsx`

```jsx
import Titulo from './Titulo';
function App() {
  return <Titulo />; //--------Agregado Asi es como se utiliza
}
export default App;
```

# 7. Instalación de Bootstrap

- #### c: instalación de bootstrap:

  `npm i bootstrap@5.3.3`

- #### n: elimino toda la información de estilos:

  - #### u: ` react-app\src\App.css`

  - #### u: ` react-app\src\index.css`

## 7.1) añadiendo bootstrap

- #### u: ` react-app\src\main.tsx`

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

## 7.2) Estilos en Línea

- No es tan buena práctica así: se pasan dentro de un `{}` ya que así se evalúa una variable dentro, y la variable es un objeto. Entonces será `{elementos del objeto: dato}`.

  ```jsx
  <div className="card" style={{ width: '440px' }}>
  ```

- ### 7.2.2) Forma 2:

  ```jsx
  const width = { width: '440px' };
  return (
    <div className="card" style={width}>
  ```

# 8. Creando Componentes y Reutilizando

- #### u: `react-app\src\components\Card.tsx`

  ```jsx
  function Card() {
    const width = { width: '440px' };
    return (
      <div className="card" style={width}>
        <div className="card-body">
          <CardBody /> //---------- aquí se llama al componente
        </div>
      </div>
    );
  }

  export function CardBody() {
    // se creó otro componente dentro del mismo archivo, se puede así o como quiera
    return (
      <>
        {' '}
        // también se podría usar fragment de React, esto sirve para no crear un div dentro de otro div.
        //-------- Esto simplemente hace que una lo que está adentro pero no va a crear este componente
        ya que si se usa div, sí crearía el componente div
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </>
    );
  }

  export default Card;
  ```

  - #### se podria utilizar asi:

  ```jsx
  import Card, { CardBody } from './components/Card';
  ```

# 9. Pasándole las Propiedades a un Componente

- #### u: `react-app\src\App.tsx`

  ```jsx
  import Card from './components/Card';

  function App() {
    return (
      <div>
        <Card body={'mensaje desde el App.tsx'} />; //---- aquí se pasa la info
      </div>
    );
  }

  export default App;
  ```

## 9.1) Me Voy al Componente que Le Paso

- #### u: `react-app\src\components\Card.tsx`

  ```jsx
  function Card(props) {
    const { body } = props; // se sugiere usar destructuring
    const width = { width: '440px' };
    return (
      <div className="card" style={width}>
        <div className="card-body">{body}</div> //---- aquí se utiliza
      </div>
    );
  }
  ```

## 9.2) Ahora Para Evitar Errores de TypeScript se Debe Colocar el Tipo

- #### n: `react-app\src\components\Card.tsx`

  ```jsx
  // interface CardProps { // asegurarse que el nombre
  // de la Interface tenga el Nombre del componente + Props
  // o simplemente Props
  interface Props {
    body: string;
  }

  function Card(props: Props) {
    const { body } = props; // se sugiere usar destructuring
    const width = { width: '440px' };
    return (
      <div className="card" style={width}>
        <div className="card-body">{body}</div>
      </div>
    );
  }
  ```

# 10. Si Quiero Varias Propiedades

- #### u: `react-app\src\components\Card.tsx`

- #### n: El signo `?` (question mark), en una interfaz hace que esta no sea obligatoria pasársela.

  ```jsx
  interface CardBodyProps {
    title: string;
    text?: string;
  }

  export function CardBody(props: CardBodyProps) {
    const { title, text } = props;
    return (
      <>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </>
    );
  }
  ```

## 10.1) Pasándole a CardBodyProps las Propiedades

- #### u: `react-app\src\App.tsx`

  ```jsx
  import CardBody from './components/Card';

  function App() {
    return (
      <div>
        <CardBody title={'titulo'} text="mi texto es " />;
      </div>
    );
  }

  export default App;
  ```

# 11) Pasándole Propiedad Children al Componente Hijo

- #### Mucho Cuidado: "children" es en Minúsculas

- #### u: `react-app\src\App.tsx`

  ```jsx
  <Card>mandando propiedad desde children</Card>
  ```

## 11.1) Ojo: La Palabra "children" Ya Viene Definida como Propiedad Propia de React

- #### n: No Se Puede Usar Esa Palabra como un Nombre de una Propiedad

- #### u: `react-app\src\components\Card.tsx`

  ```jsx
  interface Props {
    children: string; // nombre inmutable
    body?: string;
  }

  function Card(props: Props) {
    const { body, children } = props; // se sugiere usar destructuring
    return <div className="card-body">{children}</div>;
  }
  ```

## 11.2) Pasándole Un Componente a Otro Componente por Medio del Children

- #### u: `react-app\src\App.tsx`

  ```jsx
  <Card>
    <CardBody title={'titulo'} text="mi texto es " />
  </Card>
  ```

- #### n: Sin embargo, me mandará este error:

```rust
This JSX tag's 'children' prop expects type 'string'which requires multiple children, but only a single child was provided.
```

### 11.2.1) Corrección para Evitar el Error

- #### n: Para evitar el error, debo buscar una propiedad adecuada para la interfaz:

- #### u: `react-app\src\components\Card.tsx`

  ```jsx
  interface Props {
    children: React.ReactNode; //----- Agregado para corregir el error
    body?: string;
  }

  function Card(props: Props) {
    const { body, children } = props; // se sugiere usar destructuring
    return <div className="card-body">{children}</div>;
  }
  ```

### 11.2.2) Forma 2 para Evitar el Error

- #### u: `react-app\src\components\Card.tsx`

  ```jsx
  import { ReactNode } from 'react'; //----- Importar ReactNode

  interface Props {
    children: ReactNode; //----- Usar ReactNode para children
    body?: string;
  }
  ```

# 12) Creando un Componente de Lista

- #### n: Creo el componente Lista

- #### U: `react-app\src\components\List.tsx`

  ```jsx
  type Props = {
    data: string[], //--- Esto será un arreglo de strings
  };

  function List({ data }: Props) {
    return (
      <div>
        <ul className="list-group">
          {data.map((item, index) => (
            <li key={index} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  export default List;
  ```

## 12.2) Para el Ejemplo, Solo le Pasaré la `key` el Mismo Elemento

```jsx
<ul className="list-group">
  {data.map((elemento) => (
    <li key={elemento} className="list-group-item">
      {elemento}
    </li>
  ))}
</ul>
```

## 12.3) Ahora Hago el Llamado de Ese Componente

- #### u: `react-app\src\App.tsx`

```jsx
function App() {
  const list = ['Goku', 'Vegeta'];
  return <List data={list} />;
}
```

# 13) Eventos

- #### n:En este fragmento,
  se añade un evento `onClick` a cada elemento de la lista, que imprime en la consola un mensaje cuando se hace clic en el elemento
- #### u: `react-app\src\components\List.tsx`

```jsx
<li
  onClick={() => console.log('evento', elemento)}
  key={elemento}
  className="list-group-item"
  value={elemento}
>
  {elemento}
</li>
```

## 13.1) Convenciones de Eventos

- #### n: en este fragmento:
  En este fragmento, se define una función `handleClick` que maneja el evento del clic, imprimiendo el evento en la consola. Se utiliza el tipo `MouseEvent` de React para tipar correctamente el evento.
- #### u: `react-app\src\components\List.tsx`

```jsx
import { MouseEvent } from 'react'; //---agregado es usado para el evento

type Props = {
  data: string[],
};

function List({ data }: Props) {
  //---------------------convencion

  const handleClick = (e: MouseEvent) => {
    console.log('evento', e);
  };

  return (
    <div>
      <ul className="list-group">
        {data.map((elemento) => (
          //------------el handleClick aquí toma el evento
          <li onClick={handleClick} key={elemento} className="list-group-item" value={elemento}>
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 13.2) Pasando Información Diferente al Evento

- #### n: En este fragmento:

  En este fragmento, se define una función `handleClick` que recibe un parámetro de tipo `string`. Al hacer clic en un elemento de la lista, se pasa el `elemento` correspondiente a esta función mediante una función de flecha en el evento `onClick`.

- #### u: `react-app\src\components\List.tsx`

```jsx
const handleClick = (e: string) => {
  console.log('evento', e);
};

return (
  <div>
    <ul className="list-group">
      {data.map((elemento) => (
        <li
          onClick={() => handleClick(elemento)}
          key={elemento}
          className="list-group-item"
          value={elemento}
        >
          {elemento}
        </li>
      ))}
    </ul>
  </div>
);
```

# 14) Estados

- #### n: En este fragmento:

  React por sí solo no conoce las variables, por lo tanto, si no las conoce y se hace un cambio en alguna variable que se esté usando en alguna parte del HTML, entonces no se reflejará en el front. En el ejemplo, se muestra cómo manejar el cambio de una variable `index` al hacer clic en un elemento de la lista.

- #### n: En este fragmento:

  Como se puede observar, se usa el `index` en el atributo `className`. Sin embargo, esto no refleja ningún cambio en el servidor, ya que React se encarga de ver qué elemento cambió en el DOM y avisarle al `ReactDOM`. Por lo tanto, React no puede, con solo la función `handleClick`, reconocer si esa variable cambió. Debe usarse una funcionalidad que permita reconocer que esa variable ha cambiado.

- #### u: `react-app\src\components\List.tsx`

```jsx
function List({ data }: Props) {
  let index = 4; //-----------variable

  const handleClick = (e: number) => {
    index = e; //---------función que cambia el valor de la variable
    console.log('evento', index);
  };

  return (
    <div>
      <ul className="list-group">
        {data.map((elemento, i) => (
          <li
            onClick={() => handleClick(i)} //-----💥evento que hace llamado a función que cambia variable
            key={elemento}
            //-------💥Uso de la variable "index", para poner o no el active
            className={`list-group-item ${i === index ? 'active' : ''}`}
            value={elemento}
          >
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 14.1) Uso del `useState`

- #### u: `react-app\src\components\List.tsx`

```jsx
function List({ data }: Props) {
  // index es la variable, setIndex es la función que modifica la variable
  const [index, setIndex] = useState(-10); //----- 💥 Uso del useState

  const handleClick = (e: number) => {
    setIndex(e); //----------💥 Uso de la función que cambia el valor
    // de la variable, y que es a su vez detectable por React
  };

  return (
    <div>
      <ul className="list-group">
        {data.map((elemento, i) => (
          <li
            onClick={() => handleClick(i)}
            key={elemento}
            className={`list-group-item ${i === index ? 'active' : ''}`}
            value={elemento}
          >
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

# 15) Pasando funciones como propiedades

- #### u: `react-app\src\components\List.tsx`

```jsx
type Props = {
  data: string[],
  onSelect?: (elemento: string) => void, //---- función definida en esta interfaz, "?:" para que sea opcional
};

function List({ data, onSelect }: Props) {
  //------ Recibe la función como propiedad
  const [index, setIndex] = useState(1);

  const handleClick = (e: number, elemento: string) => {
    //------ recibe el elemento
    setIndex(e);
    onSelect?.(elemento); //------ Uso de la función y le pongo "?." para que no me dé error si no se le pasa la función
  };

  return (
    <div>
      <ul className="list-group">
        {data.map((elemento, i) => (
          <li
            onClick={() => handleClick(i, elemento)} //------ ahora le paso el elemento solo para el ejemplo
            key={elemento}
            className={`list-group-item ${i === index ? 'active' : ''}`}
            value={elemento}
          >
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 15.2) Usando la función definida en el componente

- #### u: `react-app\src\App.tsx`

```jsx
function App() {
  const list = ['Goku', 'vegeta', 'krilin', 'gohan', 'picoro'];

  const handleSelect = (elemento: string) => {
    //---- creo la función
    console.log('Imprimiendo', elemento);
  };

  return (
    <div>
      <CardBody title={'titulo'} text="mi texto es " />
      {/* <Card body="Hola soy body" /> */}
      <Card>
        <CardBody title={'titulo'} text="mi texto es " />
        <List data={list} onSelect={handleSelect} /> //---- Le paso la función
      </Card>
    </div>
  );
}
```

# 16) Renderizado Condicional

- #### n: Implementación de renderizado condicional en el componente
- #### u: `react-app\src\App.tsx`

```jsx
//-----------condicional que dependiendo si va a renderizar
const contenido = (e: string) =>
  list.length ? (
    <>
      <h1>hola, la longitud sí existe y el dato recolectado es: {e}</h1>
      <List data={list} onSelect={handleSelect} />
    </>
  ) : (
    <h2>sin elemento para mostrar</h2>
  );

return (
  {contenido('yo soy el dato ')} //----usando la función
);

// si no quiero mostrar nada, puedo dejarlo vacío o usar el operador "short operator"
list2.length ? (
  <>
    aquí muestra algo
  </>
) : (
  '' // aquí ya no muestra nada
);
```
