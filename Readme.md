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

# 17) Creando un botón y cambiar un estado para modificar el color

- #### n: Forma 1, dentro del mismo componente
- #### u: `react-app\src\components\Button.tsx`

```jsx
const [isLoading, setIsLoading] = useState < boolean > false;

const handleClick = () => {
  setIsLoading(true);
};

return (
  <button
    onClick={handleClick}
    disabled={isLoading}
    type="button"
    className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
  >
    {isLoading ? 'cargando...' : 'presiona'}
  </button>
);
```

## 17.1) Forma 2 creando un componente botón

- #### u: `react-app\src\App.tsx`

```jsx
const [isLoading, setIsLoading] = useState < boolean > false;

const handleClick = () => {
  setIsLoading(true);
};

return (
  <Button isLoading={isLoading} onClick={handleClick}>
    press here
  </Button>
);
```

## 17.2) Creación del componente Button

- #### u: `react-app\src\components\Button.tsx`

```jsx
import { ReactNode } from 'react';

type Props = {
  isLoading: boolean,
  onClick: () => void, // Este tipo indica que la función no devuelve nada
  children: ReactNode, // Permite que el children pueda contener cualquier tipo de elemento
};

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}

export default Button;
```

# 18) Gestión de estado para eliminar y agregar a una lista

- #### u: `react-app\src\App.tsx`
- #### En este fragmento:

  `addMinion`: Agrega un nuevo elemento ('Minion') al final de la lista actual.

  `delMinion`: Elimina el último elemento de la lista usando el método .slice().

  Los botones reutilizan el componente Button definido previamente en 17.2 y las funciones se pasan como props.

```jsx
const [data, setData] = useState<string[]>(['Goku', 'vegeta', 'krilim', 'gohan', 'picoro']);

const addMinion = () => { // Función para agregar un elemento
  setData([...data, 'Minion']);
};

const delMinion = () => {  // Función para eliminar el último elemento
  setData(data.slice(0, data.length - 1));
};

return (
  <Card>
    <Button onClick={addMinion}>Agregar</Button>
    <Button onClick={delMinion}>Eliminar</Button>
    <List data={data} ></List>
  </Card>
);
```

# 19) Dándole estilos

## 19.1.1) Estilos en línea (linestyles)

- #### u: react-app\src\components\Button.tsx
- #### En este fragmento:

  - Se utiliza el estilo en línea para aplicar propiedades CSS directamente a los elementos HTML.
  - Los nombres de las propiedades CSS siguen el formato **camelCase** cuando se usan en JSX. Por ejemplo, `margin` en vez de `margin-top`.

  En este caso, se aplica un margen de `'5px'` al botón mediante el objeto `style`.

```jsx
function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      style={{ margin: '5px' }} // Estilo en línea aplicado con camelCase
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}
```

### 19.1.2) Estilos en línea con una variable

- #### u: react-app\src\components\Button.tsx
- #### En este fragmento:

  - Los estilos se definen en un objeto llamado `styles`, donde cada propiedad CSS sigue el formato **camelCase**.
  - Este objeto se pasa como valor al atributo `style` del elemento `button`, envuelto en **curly brackets** (`{}`).

  Esta es una forma más organizada de manejar múltiples estilos sin repetir el código directamente en el JSX.

```jsx
const styles = {
  // Estilos definidos en un objeto
  margin: '10px',
  backgroundColor: 'red',
};

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      style={styles} // Los estilos se aplican usando curly brackets
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}
```

## 19.2) Usando CSS

- #### u: react-app\src\components\Button\
- #### En este fragmento:

  - Se crea un directorio llamado `Button` donde se moverá el componente `Button`.
  - Dentro del directorio, se crea un archivo CSS separado para manejar los estilos sin utilizar **camelCase**, siguiendo las convenciones normales de CSS.

  #### 19.2.1) Crear archivo CSS

  - Se crea un archivo de estilos: `Button.css`.

- #### u: react-app\src\components\Button\Button.css

  Ejemplo de contenido:

```css
button {
  background-color: green;
}
```

## 19.3) Usando CSS Modules

- #### u: react-app\src\components\Button\
- #### En este fragmento:

  - El archivo de estilos CSS se renombra a `Button.module.css` para habilitar el uso de **CSS Modules**, lo que permite que los estilos sean locales al componente, evitando que afecten otros elementos del mismo tipo en la aplicación.

  - OJO: si quiero agregar un estilo, debo crearlo como clase:
    osea `button ` ya que si le pongo `button` sin el clase
    lo que hara es darle a el estilo a todos lo elementos nativos `button `
    entonces

---

### 19.3.1) Crear archivo de CSS Modules

- #### u: react-app\src\components\Button\Button.module.css

  Ejemplo de contenido:

```css
.button {
  background-color: rgb(128, 2, 0);
}
```

### 19.3.2) Uso de módulos CSS para aplicar estilos

- #### En este fragmento:

  Se asignan los estilos importándolos desde un archivo `.module.css` a una variable llamada `styles`. Esto permite aplicar clases CSS a los elementos de manera dinámica usando la sintaxis `className={styles.button}`. También se muestra un ejemplo de cómo las clases pueden cambiar dependiendo del estado (`isLoading`).

```jsx
import styles from './Button.module.css'; // Importa los estilos en una variable "styles"
// El nombre de la variable puede ser personalizado.

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      type="button"
      className={styles.button} // Usa "styles.button" para aplicar la clase CSS
      // className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}
```

#### 19.3.2.2) NOTA:

- Es recomendable usar **CSS Modules** sobre el CSS puro porque, aunque no requiere camelCase, evita conflictos entre clases.
- CSS Modules asigna automáticamente un **hash** único a cada clase, lo que garantiza que no haya choques entre clases con el mismo nombre en diferentes componentes.

#### Ejemplo del resultado:

Al usar **CSS Modules**, el botón con la clase `.button` en el archivo CSS queda renderizado así en el HTML:

```html
<button type="button" class=" _button_1tq4n_1 _padded_1tq4n_9">Agregar</button>
```

#### nota

Como se observa, la clase original .button se transforma en una clase con un hash único: `_button_1tq4n_1.`

Si hubiera otra clase como .padded, también recibe su propio hash, por ejemplo: `\_padded_1tq4n_9`

#### Ventaja:

De esta manera, no se mezclan las clases entre componentes, incluso si se usan los mismos nombres de clases en diferentes archivos CSS.
Esto hace que los estilos sean locales al componente y elimina el riesgo de sobrescribir estilos accidentalmente en otras partes de la aplicación.

### 19.3.3) Combinando estilos con módulos CSS

- #### u: `react-app\src\components\Button\Button.module.css`
- #### En este fragmento:

  Se definen dos clases de estilo en el archivo CSS: `.button` y `.padded`. La clase `.button` establece el color de fondo, mientras que la clase `.padded` aplica un padding específico. Estos estilos pueden combinarse al asignarlos a un elemento en el componente.

```css
.button {
  // Estilo 1
  background-color: rgb(128, 2, 0);
}

.padded {
  // Estilo 2
  padding: 10px 30px;
}
```

#### 19.3.3.2) Combinando estilos en el componente Button

- #### u: `react-app\src\components\Button\index.tsx`
- #### En este fragmento:

  Se muestra cómo combinar múltiples clases de estilo en un componente. Se importan los estilos desde el archivo `Button.module.css`. Existen varias formas de unir estilos:

  - **Forma 1 (recomendada)**: Utiliza un array y el método `.join(' ')` para combinar los estilos.
  - **Forma 2**: Usa interpolación de cadenas para unir los estilos.
  - **Forma 3**: Combina estilos de manera dinámica, permitiendo que los estilos cambien según el estado.

```jsx
import styles from './Button.module.css'; // Importo igualmente

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      type="button"
      // Forma 1 de unir los estilos (recomendada)
      className={[styles.button, styles.padded].join(' ')}
      // Forma 2 de unir los estilos
      // className={`${styles.button} ${styles.padded}`}

      // Forma 3 de unir los estilos cuando queremos añadir estilos de manera dinámica
      className={[
        isLoading ? `btn btn-primary` : `btn btn-secondary`, // Agrego lo normal de antes
        styles.button, // Le sigo agregando en el array los estilos
        styles.padded, // Le sigo agregando en el array los estilos
      ].join(' ')}
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}
```

#### 19.3.3.3) Usar una variable para manejar múltiples clases

- #### u: react-app\src\components\Button\index.tsx
- #### En este fragmento:

  - Si los estilos del componente se vuelven muy extensos, se puede optar por almacenarlos en una variable utilizando un array de clases y luego combinarlas usando `.join(' ')`.
  - Esto facilita la lectura y organización de los estilos cuando hay múltiples clases o condiciones.

---

#### Ejemplo de código:

```jsx
import styles from './Button.module.css';

function Button({ isLoading, children, onClick }: Props) {
  const className = [
    // Variable que contiene las clases
    isLoading ? `btn btn-primary` : `btn btn-secondary`, // Clases condicionales
    styles.button, // Clase de CSS Module
    styles.padded, // Otra clase de CSS Module
  ].join(' '); // Une las clases en una sola cadena separada por espacios

  return (
    <button
      className={className} // Aplica la variable de clases
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}
```

# 20) CSS en JS

- **Descripción**: CSS en JS es una técnica que permite mantener los estilos en el mismo archivo que el componente, facilitando la gestión de estilos y su encapsulamiento.

- **Para esto, se utilizará una librería:**

  - **Instalación**:

    `npm i styled-components`

- **Nota**: Si por alguna razón hay un error señalando que no están los tipos, puedes instalar los tipos de la siguiente manera:

  - **Instalación de tipos**:

    `npm i @types/styled-components`

## 20.1) Aplicando estilos al botón con `styled-components`

- #### u: react-app\src\components\Button\index.tsx
- #### En este fragmento:

  - Se utiliza la librería `styled-components` para definir los estilos directamente en el componente, usando **template literals** (backticks o acentos graves: `` ` ``).
  - Esto permite escribir CSS dentro del archivo JavaScript/TypeScript de manera más limpia y modular.

```jsx
import styled from 'styled-components';

const Btn = styled.button`
  // Definición del botón con estilos
  background-color: rgb(33, 35, 31);
  padding: 100px 30px;
  color: rgb(100, 60, 301);
`;

function Button({ isLoading, children, onClick }: Props) {
  return (
    <Btn // Cambiamos el componente por `Btn` con los estilos aplicados
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'cargando...' : children}
    </Btn>
  );
}
```

### 20.1.2) Resultado de usar styled-components

- **Resultado**:
  ```html
  <button type="button" class="sc-imWZod eKsCXj btn btn-secondary">Agregar</button>
  ```

## 20.2) Pasando propiedades para cambiar estilos

- #### u: react-app\src\components\Button\index.tsx
- #### En este fragmento:

  - Se agrega una propiedad al componente `Btn` para poder cambiar los estilos dinámicamente según el estado del botón.

```jsx
import { ReactNode } from 'react';
import styled from 'styled-components';

type BtnProps = {
  // Definición de las propiedades que acepta el botón
  isLoading?: boolean, // Propiedad opcional que indica si el botón está en estado de carga
};

const Btn =
  styled.button <
  BtnProps > //Agregamos el tipo de las propiedades al botón
  `  
  background-color: ${(props) =>
    props.isLoading ? 'red' : 'blue'};  // Lógica para definir el color de fondo
  padding: 100px 30px;
  color: rgb(100, 60, 301);
`;

function Button({ isLoading, children, onClick }: Props) {
  return (
    <Btn
      isLoading={isLoading} // Pasamos la propiedad al botón
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'cargando...' : children}
    </Btn>
  );
}

export default Button;
```

### 20.2.2) Pasando propiedades desde el componente padre

- #### u: react-app\src\App.tsx
- #### En este fragmento:

  - Se pasa la propiedad `isLoading` al componente `Button` desde el componente padre para controlar el estado de carga.

```jsx
import Button from './components/Button';
...
return (
  <Card>
    {/* Le paso el isLoading */}
    <Button isLoading={true} onClick={addMinion}>
      Agregar
    </Button>
```

# 21) biblotecas que mas utilizare:

- Bootstrap-> react.bootstrap
- tailwind-> usa la biblioteca Deisy UI
- BulmaCss-> react bulma
- Chakra UI -> especifica de react

# 22) React Icons

- **Descripción**: `react-icons` es una biblioteca que permite utilizar iconos de diversas bibliotecas en un proyecto de React de manera sencilla.

- **Instalación**:
  `npm install react-icons`

## 22.1) Uso de React Icons

- #### u: (componente donde se utiliza)

- #### En este fragmento:

  Se importa un icono específico (`FaRegThumbsUp`) de la biblioteca `react-icons` y se utiliza dentro del componente, permitiendo personalizar propiedades como el color y el tamaño.

```jsx
import { FaRegThumbsUp } from 'react-icons/fa';

return (
  <FaRegThumbsUp color="red" size={50} /> // Así se haría el uso
);
```

# 23) Ejercicio: Cambio de color del botón

- #### u: `react-app\src\App.tsx`
- #### En este fragmento:

  Se define un componente `App` que maneja un estado booleano `status` para controlar el color de un botón (o alerta). La función `toggleStatus` cambia el estado al hacer clic en el componente `Alert`.

```jsx
function App() {
  const [status, setStatus] = useState < boolean > false;
  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <Alert onClick={toggleStatus} status={status}>
      Alerta
    </Alert>
  );
}
```

## 23.1) Creación del componente Alert

- #### u: `react-app\src\components\Alert\index.tsx`
- #### En este fragmento:

  Se define un componente `Alert` que recibe propiedades para manejar el estado, el contenido del niño (`children`), y un evento de clic. Dependiendo del estado, se aplican diferentes estilos para cambiar el color del alert.

```jsx
import { ReactNode } from 'react';
import styles from './Alert.module.css';

type Props = {
  children: ReactNode,
  status: boolean,
  onClick: () => void,
};

function Alert({ status, onClick, children }: Props) {
  return (
    <div
      className={[styles.alert, status ? styles.alertPrimary : styles.alertSecondary].join(' ')}
      onClick={onClick}
    >
      Alert {status ? 'true' : 'false'}
      {children}
    </div>
  );
}

export default Alert;
```

## 23.2) Creación de los estilos para Alert

- #### u: `react-app\src\components\Alert\Alert.module.css`
- #### En este fragmento:

  Se definen los estilos CSS para el componente `Alert`. Se establecen estilos base y se diferencian dos estados: `alertPrimary` y `alertSecondary`, que cambian el color de fondo y el borde del alert según el estado.

```css
.alert {
  padding: 10px 15px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  color: #fff;
}

.alertPrimary {
  background-color: red;
  border-color: darkred;
}

.alertSecondary {
  background-color: rgb(0, 0, 255);
  border-color: darkred;
}
```

# 24) Creando un botón y agregando hover, icono y estado

- #### u: `react-app\src\components\Button\Index.tsx`
- #### En este fragmento:

  Se define un componente `Button` que utiliza **Styled Components** y **React Icons**. El botón tiene un estado que determina su estilo y comportamiento. Se incluyen dos tipos de botones: uno con **Styled Components** y otro con **CSS Modules**.

```jsx
import { ReactNode } from 'react'; // Importo el tipo
import styled from 'styled-components'; // Para usar styled components
import { FaRegThumbsUp } from 'react-icons/fa'; // Icono para el botón
import styles from './Button.module.css'; // Para estilos con modules
import { IoIosSend } from 'react-icons/io'; // Icono de enviar
import { FaCheck } from 'react-icons/fa'; // Icono de chequeo

// Propiedades para styled component
type BtnProps = {
  sent?: boolean,
};

const Btn =
  styled.button <
  BtnProps >
  `
  background-color: ${(props) => (props.sent ? 'red' : '#ff6347')};
  padding: 8px 12px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover { //------------ Agrega un efecto hover al botón
    background-color: #e5bcb4;
  }
`; // Fin de las propiedades para styled component

type Props = {
  sent?: boolean,
  onClick: () => void,
  children: ReactNode,
};

function Button({ sent, onClick, children }: Props) {
  return (
    <div>
      // Botón con styled components
      <Btn sent={sent} onClick={onClick} disabled={sent}>
        <FaRegThumbsUp color="red" size={50} />
      </Btn>
      <br />
      <br />
      // Botón con module componentes
      <button
        disabled={sent}
        onClick={onClick}
        className={[styles.btn, styles.btnPrimary].join(' ')}
      >
        {sent ? 'enviado' : `${children}`}
        {sent ? (
          <FaCheck color="green" className={styles.icon} />
        ) : (
          <IoIosSend color="blue" className={styles.icon} />
        )}
      </button>
    </div>
  );
}

export default Button;
```

## 25) Cómo usar el `useState` cuando se tiene relación en las variables (objeto de estados)

- #### Ejemplo: Modificando el nombre y apellido

  En este caso, en lugar de manejar el estado de las variables `name` y `lastName` por separado, se recomienda agruparlas dentro de un objeto. Esto facilita la gestión del estado cuando hay relación entre las variables.

- Se define un estado `user` que contiene `name y lastName`.
  Al hacer clic en el botón, se actualiza el `name` del objeto `user`, conservando el resto de las propiedades mediante la sintaxis de spread operator `(...user)`

### Implementación:

```jsx
import { useState } from 'react';

function App() {
  // Estado agrupado en un objeto
  const [user, setUser] = useState({ name: 'Carlos', lastName: 'Perez' });

  const handleClick = () => {
    // Cambiando el estado del objeto
    setUser({ ...user, name: 'JuanCambiado' });
  };

  return (
    <div>
      <h1>
        {user.name} {user.lastName}
      </h1>
      <button onClick={handleClick}>Cambiar Nombre</button>
    </div>
  );
}
```

- #### Ejemplo 2: Agregando un objeto al array de objetos

- #### Estado inicial

  En este caso, se utiliza un array de objetos para manejar una lista de productos, donde cada producto tiene un `name` y un `price`.

### Implementación:

```jsx
import { useState } from 'react';

function App() {
  // Estado inicial con un array de productos
  const [products, setProducts] = useState([
    { name: 'shoes', price: 20 },
    { name: 'shirts', price: 30 },
  ]);

  const handleClick = () => {
    // Agregando un nuevo producto al array
    let newProducts = [...products, { name: 'pants', price: 40 }];
    setProducts(newProducts);
  };

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name}: ${product.price}
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Agregar Pantalones</button>
    </div>
  );
}
```

# 26) Cambiando propiedades de objeto que se encuentran anidadas

- #### u: `react-app2\src\components\Anidadas.tsx`

- #### Estado inicial

  Este ejemplo muestra cómo modificar un objeto que contiene propiedades anidadas en su estructura. En este caso, el objeto `product` tiene una propiedad `addreess`, que a su vez contiene `street` y `number`.

### Implementación:

```jsx
import React from 'react';

function Anidadas() {
  // Estado inicial del producto
  const [product, setProducts] = React.useState({
    name: 'Pizza',
    price: 20,
    addreess: { street: 'calle 1', number: 123 },
  });

  const handleClick = () => {
    // Cambiando la dirección del producto
    setProducts({
      ...product,
      addreess: {
        ...product.addreess,
        street: 'calle 6', // Modificando solo la propiedad 'street'
      },
    });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{product.addreess.street}</h2>
      <h2>{product.addreess.number}</h2>
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
}

export default Anidadas;
```

# 27) Cambiando propiedades de ARRAY DE OBJETOS

- #### u: `react-app2\src\components\ArrayDeObjetos.tsx`
- #### Notas:

  - Para agregar un objeto se usa el spread operator.
  - Para modificar un objeto se usa `map`.
  - Para eliminar un objeto se usa `filter`.

## Implementación:

```jsx
import React from 'react';

function ArrayDeObjetos() {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Zapatos', price: 20 },
    { id: 2, name: 'Camisa', price: 30 },
  ]);

  // ---- Agregando 1 objeto más al array
  const handleClick = () => {
    setProducts([
      ...products,
      {
        id: 3,
        name: 'Hamburguesa',
        price: 30,
      },
    ]);
  };

  // ---- Agregando 1 objeto más al array pero al principio
  const handleClick2 = () => {
    setProducts([
      {
        id: 4,
        name: 'Hamburguesa',
        price: 30,
      },
      ...products,
    ]);
  };

  // Modificando un valor de un objeto:
  // En este caso se cambia el nombre del producto con id 2, se hace con map
  // ya que devuelve un nuevo array con los cambios, es decir, un nuevo array
  const handleClick3 = () => {
    const newArray = products.map((product) => {
      return product.id === 2 ? { ...product, name: 'perroArreglado' } : product;
    });
    setProducts(newArray);
  };

  // Eliminando un objeto
  const handleClick4 = () => {
    const newArray = products.filter((product) => {
      return product.id !== 2;
    });
    setProducts(newArray);
  };

  return (
    <div>
      {/* Aquí podrías renderizar los productos o los botones para ejecutar las funciones */}
      <button onClick={handleClick}>Agregar Hamburguesa</button>
      <button onClick={handleClick2}>Agregar Hamburguesa al Principio</button>
      <button onClick={handleClick3}>Modificar Producto con ID 2</button>
      <button onClick={handleClick4}>Eliminar Producto con ID 2</button>
    </div>
  );
}

export default ArrayDeObjetos;
```

# 28) Compartiendo estados a elementos

- #### u: `react-app3\src\App.tsx`

### Implementación:

```jsx
import { useState } from 'react';
import ProductDashboard from './components/ProductDashboard';
import ProductList from './components/ProductList';
import Button from './components/Button';

function App() {
  // Estado inicial de productos
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ]);

  // Función para agregar un nuevo producto
  const handleClick = () => {
    const newProduct = { id: 4, name: 'Product 4', price: 400 };
    setProducts([...products, newProduct]);
  };

  return (
    <>
      {/* Pasando los estados a los componentes */}
      <ProductDashboard amount={products.length} />
      <Button onClick={handleClick}>Enviar</Button>
      <ProductList products={products} />
    </>
  );
}

export default App;
```

## 28.2) Creando el botón

- #### u: `react-app3\src\components\Button.tsx`

### Implementación:

```jsx
import { ReactNode } from 'react';

type Props = {
  // Definición de la interfaz para las propiedades del botón
  children: ReactNode,
  onClick: () => void,
};

function Button({ onClick, children }: Props) {
  // Uso de las propiedades en el botón
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
```

## 28.3) Creando la lista de productos

### Implementación:

```jsx
import React from 'react';

type Product = {
  // Definición de un Product como un objeto con varias propiedades
  id: number,
  name: string,
  price: number,
};

type Props = {
  // Tipo de las propiedades que recibe ProductList
  products: Product[], // Arreglo de productos
};

function ProductList({ products }: Props) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
```

## 29) Ejercicio: Agregar, eliminar y vaciar estado

- #### u: `react-app4`
