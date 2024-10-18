## deploy

- #### instalar vercel globalmente:
  `npm install -g vercel`
- crea un nuevo proyecto en verel y agrega tu proyeto en git
- proyect deployed: https://kpc-react-form.vercel.app/

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

# 29) Ejercicio: Agregar, eliminar y vaciar estado

- #### u: `react-app4`

# 30) Formularios

- #### u: `react-form`

### Nota:

Se utiliza la biblioteca **React Hook Form**, la cual permite manejar formularios de manera eficiente usando referencias (no controlados) o el evento `onChange` (controlados). Esto optimiza el rendimiento al evitar que todo el formulario se vuelva a renderizar cuando cambia un solo campo.

### Implementación:

```bash
npm install react-hook-form
```

## 30.0) Formularios no controlados

- #### u: `react-form\src\components\form.tsx`

### Nota:

En los formularios no controlados, hacemos uso del hook **`useRef`** para obtener el valor de los campos de entrada solo cuando se realiza el envío del formulario.
El `useRef` se utiliza para evitar el constante re-renderizado de los campos del formulario, permitiendo acceder a los valores en el momento del `submit`.

### Implementación:

```jsx
import React, { useRef, FormEvent } from 'react';

function Form() {
  // Definimos las referencias con useRef, apuntando inicialmente a null
  const nameRef = useRef < HTMLInputElement > null;
  const lastnameRef = useRef < HTMLInputElement > null;

  // Función que maneja el submit
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previene la recarga de la página
    const data = {
      // Accediendo a los valores usando .current y .value
      name: nameRef.current?.value,
      lastname: lastnameRef.current?.value,
    };
    console.log(data); // Datos enviados
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name">Nombre</label>
        {/* Referencia al campo de nombre */}
        <input ref={nameRef} name="nombre" type="text" id="name" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname">Apellido</label>
        {/* Referencia al campo de apellido */}
        <input ref={lastnameRef} type="text" id="lastname" className="form-control" />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default Form;
```

## 30.1) Formularios controlados

- #### u: `react-form\src\components\form.tsx`

### Implementación:

- forma como hacia con el e.target.value.
- En este enfoque, utilizamos el evento `onSubmit` para obtener los valores de los campos de entrada directamente desde el evento `target`, sin necesidad de utilizar `useRef`. Esto es útil para formularios controlados, donde los valores se manejan a través del estado del componente.

### Ejemplo de código:

```jsx
import React, { FormEvent } from 'react';

function Form() {
  // Función que maneja el submit
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previene la recarga de la página
    const form = event.target as HTMLFormElement; // Obtenemos el formulario desde el evento
    const input = form.elements.namedItem('lastname') as HTMLInputElement; // Obtenemos el campo de apellido
    console.log('el input', input.value); // Mostramos el valor del input en la consola
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name">Nombre</label>
        <input name="nombre" type="text" id="name" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname">Apellido</label>
        <input name="lastname" type="text" id="lastname" className="form-control" />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default Form;
```

### 30.1.2) Formularios controlados con `onChange` en TypeScript

- #### u: `react-form\src\components\form.tsx`

  ### Implementación:

  En este ejemplo, usamos una función `handleOnChange` para actualizar el estado cada vez que un campo de entrada cambia. Además, aplicamos validación en tiempo real.

  - OJO: unicamente cuando se este escribientdo se ejecuta el onchange,

    ### Ejemplo de código:

    ```tsx
    import React, { useState, ChangeEvent } from 'react';

    type InputState = {
      name: string;
      lastname: string;
    };

    function Form() {
      // Estado para almacenar los valores del formulario
      const [input, setInput] = useState<InputState>({
        name: '',
        lastname: '',
      });

      // Estado para almacenar los errores de validación
      const [errors, setErrors] = useState<InputState>({
        name: '',
        lastname: '',
      });

      // Función para manejar el cambio en los campos de entrada
      function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });

        setErrors(handleValidacion({
          ...input,
          [e.target.name]: e.target.value,
        }));

        console.log(input); // Muestra los cambios en tiempo real
      }

      // Función de ejemplo para validación
      function handleValidacion(inputs: InputState): InputState {
        const newErrors: InputState = { name: '', lastname: '' };

        if (inputs.name.length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
        }

        if (inputs.lastname.length < 2) {
          newErrors.lastname = 'El apellido debe tener al menos 2 caracteres.';
        }

        return newErrors;
      }

      return (
        <form>
          <div className="mb-3">
            <label htmlFor
    ```

## 30.2) Formularios controlados

- #### u: `react-form\src\components\FormControlled.tsx`

### Implementación:

En este caso, se maneja el estado del formulario de manera controlada, donde el valor de los campos de entrada es gestionado por el estado local del componente.

### Ejemplo de código:

```tsx
import React, { useState } from 'react';

function FormControlled() {
  // Estado para almacenar los valores del formulario
  const [user, setUser] = useState({ name: '', lastname: '' });

  // También puedes inicializar el estado con valores por defecto
  // const [user, setUser] = useState({ name: 'nombre', lastname: 'apellido' });

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name">Nombre</label>
        <input
          // Cada vez que hay un cambio, actualiza el estado `user`
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          name="name"
          type="text"
          id="name"
          value={user.name} // Establece el valor inicial del input desde el estado
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastname">Apellido</label>
        <input
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          name="lastname"
          type="text"
          id="lastname"
          value={user.lastname}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default FormControlled;
```

### 30.2.2) Uso de una función genérica para manejar cambios en el formulario

- #### u: `react-form\src\components\FormControlled.tsx`

  ### Implementación:

  En este enfoque, en lugar de crear una función `onChange` específica para cada campo de entrada, usamos una sola función genérica que maneja todos los cambios en los inputs. Esto es útil cuando tienes varios campos de formulario.

  ### Ejemplo de código:

  ```tsx
  import React, { useState } from 'react';

  function FormControlled() {
    // Estado para almacenar los valores del formulario
    const [user, setUser] = useState({ name: '', lastname: '' });

    // Función genérica para manejar el cambio de cualquier input
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      console.log('Cambiando:', event.target.name, event.target.value);
      // Se actualiza el estado con el valor correspondiente
      setUser({ ...user, [event.target.name]: event.target.value });
    }

    return (
      <form>
        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          <input
            // Usa la función genérica para manejar el cambio
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
            value={user.name} // Valor del estado
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname">Apellido</label>
          <input
            // Usa la misma función para este campo también
            onChange={handleChange}
            name="lastname"
            type="text"
            id="lastname"
            value={user.lastname} // Valor del estado
            className="form-control"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
    );
  }

  export default FormControlled;
  ```

---

## 30.3) 💥 React Hook Form 💥

- #### u: `react-form\src\components\FormReactHook.tsx`
- #### c: `npm i react-hook-form@7.51.3`

  ### Implementación:

  React Hook Form simplifica la gestión de formularios en React al reducir el número de renders innecesarios y mejorar el rendimiento. A continuación, se muestra cómo configurarlo.

  ### Ejemplo de código:

  ```tsx
  import React from 'react';
  import { useForm } from 'react-hook-form';

  function FormReactHook() {
    // useForm nos proporciona métodos como register, handleSubmit y formState
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Función que se ejecuta al enviar el formulario
    const onSubmit = (data: FieldValues) => {
      console.log('Datos del formulario:', data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            {...register('name', { required: true })} // Registramos el input con validación
            className="form-control"
          />
          {errors.name && <span>El nombre es obligatorio</span>}  {/* Manejo de errores */}
        </div>

        <div className="mb-3">
          <label htmlFor="lastname">Apellido</label>
          <input
            id="lastname"
            {...register('lastname', { required: true })} // Registramos otro input
            className="form-control"
          />
          {errors.lastname && <span>El apellido es obligatorio</span>} {/* Manejo de errores */}
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    );
  }

  export default FormReactHook;
  `
  ```

  ### 30.3.2) Registro de campos con React Hook Form

  - #### u: `react-form\src\components\FormReactHook.tsx`

  ### Implementación:

  Cuando usamos `register` de React Hook Form, conectamos el campo de entrada a las funcionalidades de formulario proporcionadas por la biblioteca, como la gestión de cambios, el desenfoque y la referencia.

  ### Ejemplo de código:

  ```tsx
  import React from 'react';
  import { useForm } from 'react-hook-form';

  function FormReactHook() {
    const { register } = useForm(); // Registramos los inputs

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          {/* Registramos el input "name" */}
          <input {...register('name')} type="text" id="name" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname">Apellido</label>
          {/* Registramos el input "lastname" */}
          <input {...register('lastname')} type="text" id="lastname" className="
  ```

  n: El método `register(<input {...register('name')} />)` de React Hook Form podría devolver algo similar a:

  ```typescript
  {
    name: 'name',
    ref: someFunction,
    onChange: someFunction,
    onBlur: someFunction
  }
  ```

  -Es decir algo como:

  ```js
  <input name="name" ref={someFunction} onChange={someFunction} onBlur={someFunction} />
  ```

  - El spread operator ({...register('name')}) en React Hook Form trae consigo estas propiedades para manejar el campo del formulario de manera controlada.

  ### 30.3.3) Ahora, para obtener los datos de ese campo registrado:

  ```typescript
  function FormReactHook() {
    //----obtengo el handleSubmit
    const { register, handleSubmit } = useForm();

    return (
      //-------aquí el handleSubmit posee la info del register
      <form
        onSubmit={handleSubmit((data) =>
        //-------Aquí se manejan los datos del formulario
          console.log("Información obtenida desde el 'register'", data)
        )}
      >
        <div className="mb-3">
  ```

  #### forma2

  ```TypeScript
      function FormReactHook({}: Props) {
      const { register, handleSubmit } = useForm();
      const onSubmit = (data: FieldValues) => {
        console.log('Datos del formulario:', data.nombre);
      };
      return (
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" id="nombre" {...register('nombre')} />
          </form>
        </div>
      );
    }
  ```

  ```console
    Datos del formulario: Juan
  ```

  ### 30.3.4) Validaciones con el "register"

  Para realizar validaciones utilizando `register`, puedes aprovechar las funcionalidades proporcionadas por `formState`, como `errors`. Aquí te muestro cómo implementarlo:

  - **_Tambien puede implementarse_**
  - \*max: para establecer un valor máximo.
  - \*min: para establecer un valor mínimo.
  - \*pattern: para validar con expresiones regulares.
  - \*validate: para crear una función de validación personalizada, como: `(value) => (value.length < 4 ? 'Largo mínimo 4' : true)`.

  ```typescript
  import { useForm } from 'react-hook-form';

  function FormReactHook() {
    const { register, formState } = useForm();

    // Puedes ver los errores en formState.errors
    console.log(formState.errors);

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <!-- agrego las validaciones -->
          <input
            {...register('name', {
              required: true, // Ejemplo de validación requerida
              maxLength: 20, // Ejemplo de validación de longitud máxima
              minLength: 2, // Ejemplo de validación de longitud mínima
              pattern: /^[A-Za-z]+$/i, // Ejemplo de validación con expresión regular
              validate: (value) => (value.length < 4 ? 'Longitud mínima de 4 caracteres' : true), // Ejemplo de validación personalizada
            })}
            type="text"
            id="name"
            className="form-control"
          />
          {/* Aquí podrías mostrar los errores si existen */}
          {formState.errors.name && <span>{formState.errors.name.message}</span>}
        </div>
      </form>
    );
  }

  export default FormReactHook;
  ```

  #### 30.3.4.2) Para usar la Desestructuración anidada:

  - **Forma 1**: Defino un tipo para que acepte las propiedades `name` y `lastname`.

    ```typescript
    type Form = {
      //----creo este tipo para que acepte estos
      name: string;
      lastname: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Form>(); //----le agrego el tipo para evitar errores con "name" y "lastname"
    console.log(errors);
    // Uso en el HTML:

    return (
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="nombre"
            {...register('nombre', {
              required: { value: true, message: 'Este campo es obligatorio' },
            })}
          />
          {errors.name && <span>{errors?.name?.message}</span>}
        </form>
      </div>
    );
    ```

  - **Forma 2**: Sin usar la interfaz o tipo.

    ```typescript
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    console.log(errors);

    // Uso en el HTML:
    return (
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="nombre"
            {...register('nombre', {
              required: { value: true, message: 'Este campo es obligatorio' },
            })}
          />
            <!-- //Se hace el uso del toString() para que no presente errores de typos -->

          {errors.nombre && <span>{errors?.nombre?.message?.toString()}</span>}
        </form>
      </div>
    );
    ```

  ### 30.3.5) Colocando la función del handleSubmit en una función aparte:

  - Se define una función `onsubmit` que maneja el envío de datos solo si no hay errores. Esta función se pasa como argumento a `handleSubmit`.
  - **Forma 1**: usar la interfaz o tipo.

    ```typescript
    type Form = {
      //----creo este tipo para que acepte estos
      name: string;
      lastname: string;
      nombre: string;
    };
    function FormReactHook({}: Props) {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Form>(); //------Se le pasa el Form para que pueda saber el tipo de cada input
      console.log('errores son', errors);
      //--------aqui tambien se le pasa el Form , aquí se define la función onSubmit que recibe los datos validados
      const onSubmit = (data: Form) =>
        console.log("informacion Obtenida desde el 'register'", data);

      return (
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="nombre"
              {...register('nombre', {
                required: { value: true, message: 'Este campo es obligatorio' }, //---validación requerida
              })}
            />
            <!-- //Se hace el uso del toString() para que no presente errores de typos -->
                   {errors.nombre && <span>{errors?.nombre?.message}</span>}
                 //---muestra el mensaje de error si existe
          </form>
        </div>
      );
    }

    export default FormReactHook;
    ```

  - **Forma 2**: usando el tipo `FieldValues`

    ```typescript
    //---no se utiliza lel tipo Form, solo se usa el FieldValues de react hook
    function FormReactHook({}: Props) {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(); //------como se ve aqui no se usa el Form
      console.log('errores son', errors);
      //---------aquí se define la función onSubmit que recibe los datos como FieldValues
      const onSubmit = (data: FieldValues) =>
        console.log("informacion Obtenida desde el 'register'", data);

      return (
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="nombre"
              {...register('nombre', {
                required: { value: true, message: 'Este campo es obligatorio' },
              })}
            />
            {errors.nombre && <span>{errors?.nombre?.message?.toString()}</span>}
          </form>
        </div>
      );
    }

    export default FormReactHook;
    ```

# 31) ZOD biblioteca para manejo de formularios muy pesados

- **ZOD** es una biblioteca utilizada para la validación de esquemas, ofreciendo una forma sencilla y efectiva de manejar formularios complejos.
- Otras bibliotecas de validación similares incluyen **Joi** y **Yup**, pero aquí nos enfocaremos en **ZOD** debido a su simplicidad y eficiencia en la validación de tipos.

- **Ventajas de usar ZOD**:

  - Proporciona validación de tipo estática.
  - Permite definir esquemas de validación de forma clara y concisa.
  - Soporta integración fácil con bibliotecas de formularios como **React Hook Form**.

  ## 31.0) Instalación de ZOD

  - Para comenzar a usar ZOD en tu proyecto, primero necesitas instalar la biblioteca. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

    ```bash
      npm i zod@3.22.4
    ```

    - Después de instalar ZOD, puedes crear una carpeta y un archivo donde definirás tus esquemas de validación. Por ejemplo:
      - Crea una carpeta llamada schemas (o cualquier nombre que prefieras) en la raíz de tu proyecto.
      - Crea un archivo dentro de esa carpeta, por ejemplo userSchema.ts, donde definirás tu esquema de validación con ZOD:

  ## 31.1) Creación del esquema

        - **Un Esquema**: es una definición o modelo que establece reglas y estructuras que los datos deben seguir. En el contexto de la validación de formularios y manejo de datos, un esquema especifica las reglas y restricciones que un conjunto de datos debe cumplir.
        - Para definir un esquema de validación con ZOD, puedes seguir este ejemplo.
          El archivo donde se define el esquema es

        - #### u: `react-form\src\schemas\user.ts`

          ```typescript
          // Importa ZOD para crear esquemas
          import { z } from 'zod';

          // Definición del esquema para un usuario
          export const userSchema = z.object({
            // Validación del campo 'name'
            name: z
              .string({ required_error: 'Nombre es requerido' }) //----mensaje de error personalizado cuando el campo es requerido
              .min(3, { message: 'longitud minima 3' }) //----mínimo de 3 caracteres
              .max(20), //----máximo de 20 caracteres

            // Validación del campo 'lastname'
            lastname: z
              .string({ required_error: 'Apellido es requerido' })
              .min(3, { message: 'longitud minima 3' })
              .max(20),

            // Validación del campo 'amount' (debe ser un número)
            amount: z
              .number({ coerce: true, invalid_type_error: 'el campo debe ser numerico' }) //----coerce convierte valores a número
              .min(1, { message: 'el campo es requerido' }),

            //----Validación de 'age' como ejemplo de una función personalizada
            // age: z.string().refine(
            //   (age) => { return Number(age) >= 18; }, //----comprueba si la edad es mayor o igual a 18
            //   { message: "You must be 18 years or older" }, //----mensaje de error personalizado
            // ),
          });
          ```

        - ### 31.1.2) Algunas validaciones posibles en ZOD

        - Aquí se muestran algunos ejemplos de validaciones posibles que puedes usar con ZOD. Las validaciones van desde tipos básicos hasta más complejas como arreglos, enums, refinamientos y cadenas personalizadas.

        ```link
          https://github.com/kennethdevpc/reactUpdates24/blob/master/zod.txt
        ```

        ```typescript
        import { z } from 'zod';

        // Ejemplos de validaciones con ZOD

        // Validación de cadenas de texto
        const stringSchema = z.string().min(2).max(100); //----cadenas entre 2 y 100 caracteres
        const emailSchema = z.string().email(); //----validación de email

        // Validación de números
        const numberSchema = z.number().int().positive(); //----números enteros y positivos
        const ageSchema = z.number().min(18, { message: 'Debes ser mayor de 18 años' }); //----número mínimo con mensaje personalizado

        // Validación de fechas
        const dateSchema = z
          .date()
          .min(new Date('2020-01-01'), { message: 'La fecha debe ser posterior a 2020' });

        // Validación de booleanos
        const booleanSchema = z.boolean();

        // Validación de arreglos
        const arraySchema = z.array(z.string()).nonempty(); //----arreglo de cadenas no vacío
        const arrayNumberSchema = z.array(z.number()).length(5); //----arreglo de 5 números

        // Validación de enums
        const roleSchema = z.enum(['admin', 'user', 'guest']); //----solo acepta valores del enum

        // Validación de objetos anidados
        const addressSchema = z.object({
          street: z.string(),
          city: z.string(),
          zipCode: z.string().length(5), //----código postal de longitud 5
        });

        // Validación de refinamiento
        const passwordSchema = z
          .string()
          .min(8)
          .refine((password) => /[A-Z]/.test(password), {
            message: 'Debe tener al menos una letra mayúscula',
          });

        // Validación condicional con refinamiento
        const conditionalSchema = z.union([
          z.string().length(4), //----si es cadena, debe tener 4 caracteres
          z.number().min(10), //----si es número, debe ser mayor a 10
        ]);

        // Uso de 'refine' para validaciones personalizadas
        const customSchema = z.string().refine((val) => val === 'valid', {
          message: 'El valor debe ser "valid"',
        });

        // Validación opcional
        const optionalSchema = z.string().optional(); //----campo opcional
        ```

  ## 31.2) Utilizando el esquema ZOD en el formulario, método `parse`

  - Aquí se muestra cómo utilizar el esquema de validación creado con ZOD dentro de un formulario de React usando `react-hook-form`.
  - Inicialmente, se utiliza el método `parse` para validar los datos, pero se advierte que **no es la forma recomendada** para manejar errores en formularios.
  - La opción recomendada es usar un **resolver** para manejar de manera más efectiva la validación, ya que este evalúa los resultados de la validación sin necesidad de capturar excepciones.

    - **Archivo:** `react-form/src/components/FormReactHook.tsx`

    ```typescript
    import { userSchema } from '../schemas/user'; //-----importo el esquema creado

    function FormReactHook() {
      //----usando react-hook-form con ZOD para la validación del esquema
      type Form = { name: string; lastname: string };

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Form>();

      const onSubmit = (data: Form) => {
        try {
          //--------Uso un try-catch para manejar la validación con ZOD
          const result = userSchema.parse(data); //----uso el método `parse` del esquema ZOD
          console.log('Datos validados sin errores', result);
        } catch (error) {
          //--------Capturo el error si el esquema no es válido
          // Para solucionar el error, se debe tipar explícitamente la variable error como 'Error' para que TypeScript lo reconozca como objeto de error.
          console.log(`${(error as Error).message}`);

          //--------Verifico si el error contiene 'errors' para más detalles
          if (error instanceof Error && 'errors' in error) {
            console.log('Datos del formulario inválidos', error.message);
          } else {
            console.log('Ocurrió un error desconocido', error);
          }
        }
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            {/* Input para el campo 'name', usando `register` para la conexión con react-hook-form */}
            <input {...register('name')} type="text" id="name" className="form-control" />
            {/* Mostrar errores si existen */}
            {errors.name && <span>{errors?.name?.message}</span>}
          </div>
        </form>
      );
    }

    export default FormReactHook;
    ```

    - #### ejemplo

      - #### u: `reactform\React-form\src\schemas\user.ts`
      - schema

      ```ts
      import { z } from 'zod';

      export const userSchema = z.object({
        name: z
          .string()
          .min(3, { message: 'longitud minima 3' }) //----mínimo de 3 caracteres
          .max(20), //----máximo de 20 caracteres
        lastName: z
          .string()
          .min(3, { message: 'longitud minima 3' }) //----mínimo de 3 caracteres
          .max(20), //----máximo de 20 caracteres
        age: z
          .number({ coerce: true, invalid_type_error: 'el campo debe ser numerico' }) //----coerce convierte valores a número
          .min(1, { message: 'el campo es requerido' })
          .refine((val) => val >= 18, {
            message: 'Debe ser mayor de edad',
          }),
        email: z.string().email(),
        password: z
          .string()
          .refine(
            (password) =>
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/.test(password),
            { message: 'password invalida' }
          ),
      });
      ```

      - Ahora voy al formulario y verifico con el submit los errores sin embargo aun no se mostraran en pantalla solo en consola
        - #### u: `reactform\React-form\src\components\FormReactHook.tsx  `

      ```tsx
      import React from 'react';
      import { FieldValues, useForm } from 'react-hook-form';
      import { userSchema } from '../schemas/user';

      type Props = {};
      type Form = { name: string; lastName: string; age: number; email: string; password: string };
      function FormReactHook({}: Props) {
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm<Form>();
        console.log('errores son', errors);

        const onSubmit = (data: Form) => {
          try {
            //--------Uso un try-catch para manejar la validación con ZOD
            const result = userSchema.parse(data); //----uso el método `parse` del esquema ZOD
            console.log('Datos validados sin errores', result);
          } catch (error) {
            //--------Capturo el error si el esquema no es válido
            // Para solucionar el error, se debe tipar explícitamente la variable error como 'Error' para que TypeScript lo reconozca como objeto de error.
            console.log(`${(error as Error).message}`);

            //--------Verifico si el error contiene 'errors' para más detalles
            if (error instanceof Error && 'errors' in error) {
              console.log('Datos del formulario inválidos', error.message);
            } else {
              console.log('Ocurrió un error desconocido', error);
            }
          }
        };
        return (
          <div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: 'flex', color: 'red', flexDirection: 'column' }}
            >
              <label htmlFor="">Name</label>
              <input type="text" id="name" {...register('name')} />
              {errors.name && <span>{errors?.name?.message?.toString()}</span>}
              <label htmlFor="">Last name</label>
              <input type="text" id="lastName" {...register('lastName')} />
              {errors.lastName && <span>{errors?.lastName?.message?.toString()}</span>}
              <label htmlFor="">Age</label>
              <input type="text" id="age" {...register('age')} />
              {errors.age && <span>{errors?.age?.message?.toString()}</span>}
              <label htmlFor="">Email</label>
              <input type="text" id="email" {...register('email')} />
              {errors.email && <span>{errors?.email?.message?.toString()}</span>}
              <label htmlFor="">Password</label>
              <input type="text" id="password" {...register('password')} />
              {errors.password && <span>{errors?.password?.message?.toString()}</span>}
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        );
      }

      export default FormReactHook;
      ```

      - al ejecutar save se ilustran los errores en consola:

      ```console
          Datos del formulario inválidos [
          {
            "code": "too_small",
            "minimum": 3,
            "type": "string",
            "inclusive": true,
            "exact": false,
            "message": "longitud minima 3",
            "path": [
              "name"
            ]
          },
          {
            "code": "too_small",
            "minimum": 3,
            "type": "string",
            "inclusive": true,
            "exact": false,
            "message": "longitud minima 3",
            "path": [
              "lastName"
            ]
          },
          {
            "code": "too_small",
            "minimum": 1,
            "type": "number",
            "inclusive": true,
            "exact": false,
            "message": "el campo es requerido",
            "path": [
              "age"
            ]
          },
          {
            "code": "custom",
            "message": "Debe ser mayor de edad",
            "path": [
              "age"
            ]
          },
          {
            "validation": "email",
            "code": "invalid_string",
            "message": "Invalid email",
            "path": [
              "email"
            ]
          },
          {
            "code": "custom",
            "message": "password invalida",
            "path": [
              "password"
            ]
          }
        ]
      ```

  ## 31.3) Método Resolver: Utilizando el resolver con Zod para manejar errores

  - Ahora, se utiliza el método **resolver** en combinación con la biblioteca `@hookform/resolvers`, lo cual permite una mejor integración y manejo de los errores definidos en los esquemas de Zod.
    Este enfoque elimina la necesidad de manejar manualmente los errores dentro de un `try-catch`, lo que simplifica el código y proporciona una manera más eficiente de trabajar con los formularios.

  - Beneficios del Resolver:

    - Con el zodResolver, los errores definidos en el esquema Zod son manejados automáticamente por react-hook-form, lo que proporciona una validación más eficiente.
    - Evita el uso de estructuras try-catch para manejar errores y simplifica el código.
    - Los errores se muestran directamente en los elementos de la UI asociados con cada campo del formulario.

    - **Repositorio de resolvers:** [GitHub - react-hook-form/resolvers](https://github.com/react-hook-form/resolvers)
    - **Instalación de la biblioteca:**

      ```bash
      npm install @hookform/resolvers@3.3.4
      ```

    - **Archivo:** `react-form/src/components/FormReactHookResolver.tsx`

    ```typescript
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod'; //---importo el resolver de Zod
    import { userSchema } from '../schemas/user'; //---importo el mismo esquema
    type Props = {};
    const errorLetter = { color: 'black', fontWeight: 'bold' };
    function FormReactHookResolver({}: Props) {
      type Form = {
        name: string;
        lastName: string;
        age: number;
        email: string;
        password: string;
      };

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Form>({
        resolver: zodResolver(userSchema), //-----uso el resolver de Zod con el esquema
      });

      console.log('Errores validados por Zod:', errors);

      const onsubmit = (data: Form) => {
        console.log('Datos enviados:', data);
      };

      return (
        <form
          action=""
          onSubmit={handleSubmit(onsubmit)}
          style={{ display: 'flex', color: 'red', flexDirection: 'column', maxWidth: '300px' }}
        >
          <label htmlFor="">Name</label>
          <input type="text" id="name" {...register('name')} />
          {/* Muestra el error si existe */}
          {errors.name && <span style={errorLetter}>{errors?.name?.message?.toString()}</span>}
          <label htmlFor="">Last name</label>
          <input type="text" id="lastName" {...register('lastName')} />
          {errors.lastName && (
            <span style={errorLetter}>{errors?.lastName?.message?.toString()}</span>
          )}
          <label htmlFor="">Age</label>
          <input type="text" id="age" {...register('age')} />
          {errors.age && <span style={errorLetter}>{errors?.age?.message?.toString()}</span>}
          <label htmlFor="">Email</label>
          <input type="text" id="email" {...register('email')} />
          {errors.email && <span style={errorLetter}>{errors?.email?.message?.toString()}</span>}
          <label htmlFor="">Password</label>
          <input type="text" id="password" {...register('password')} />
          {errors.password && (
            <span style={errorLetter}>{errors?.password?.message?.toString()}</span>
          )}
          <br />
          <button type="submit">Save</button>
        </form>
      );
    }

    export default FormReactHookResolver;
    ```

  ## 31.4) Evitando la duplicidad de tipos al usar Zod

  - Para optimizar el código y evitar la duplicidad de tipos al trabajar con Zod, se puede utilizar `z.infer` para inferir el tipo directamente del esquema de Zod. Esto asegura que el tipo de datos utilizado en el formulario siempre esté alineado con las validaciones definidas en el esquema.
  - De esta manera, cualquier cambio en el esquema se reflejará automáticamente en el tipo inferido, lo que facilita el mantenimiento del código.

  - **Archivo:** `react-form/src/schemas/user.ts`

  ```typescript
  import { z } from 'zod';

  export const userSchema = z.object({
    name: z
      .string({ required_error: 'Nombre es requerido' })
      .min(3, { message: 'Longitud mínima 3' })
      .max(20),
    lastname: z
      .string({ required_error: 'Apellido es requerido' })
      .min(3, { message: 'Longitud mínima 3' })
      .max(20),
    amount: z
      .number({ coerce: true, invalid_type_error: 'El campo debe ser numérico' })
      .min(1, { message: 'El campo es requerido' }),
  });

  // Inferir el tipo directamente desde el esquema para evitar duplicidad
  export type userForm = z.infer<typeof userSchema>;
  ```

  ### 31.4.2) Actualización del formulario para usar el tipo inferido

  - En este paso, se actualiza el formulario para utilizar el tipo inferido `userForm` directamente en lugar de definir un tipo de formulario manualmente. Esto simplifica el código y asegura que el tipo esté siempre alineado con las validaciones definidas en el esquema de Zod.

  - **Archivo:** `react-form/src/components/FormReactHookResolver.tsx`

    ```typescript
    import { zodResolver } from '@hookform/resolvers/zod';
    import { userSchema, userForm } from '../schemas/user'; //---importo el esquema y el tipo inferido
    import { useForm } from 'react-hook-form'; //---importo useForm de react-hook-form

    function FormReactHookResolver() {
      /* type Form = {  //-----lo utlizamos si no usamos el "type userForm" de el archivo "schemas/user.ts"
      name: string;
      lastName: string;
      age: number;
      email: string;
      password: string;
      }; */
      //---uso el tipo inferido en useForm
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<userForm>({
        resolver: zodResolver(userSchema), //---se agrega el esquema de Zod
      });

      //---cambio a usar el tipo inferido en onSubmit
      const onsubmit = (data: userForm) => {
        console.log('Datos enviados:', data); //---imprime los datos recibidos
      };

      return (
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input {...register('name')} type="text" id="name" className="form-control" />
            {errors.name && <span>{errors?.name?.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Apellido
            </label>
            <input {...register('lastname')} type="text" id="lastname" className="form-control" />
            {errors.lastname && <span>{errors?.lastname?.message}</span>}
          </div>

          {/* Botón de envío */}
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      );
    }

    export default FormReactHookResolver;
    ```
