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

# 32) Si quiero reutilizar mi botón

- **Descripción:** A continuación se utiliza el tipo `variant`, que define un conjunto de valores fijos para los estilos del botón. Esto es comúnmente conocido como un `enum` en otros lenguajes, aunque en TypeScript se logra mediante la definición de tipos literales. Además, se incluye la capacidad de especificar el tipo de botón (`button`, `submit`, `reset`) y manejar eventos de clic.

- **Ubicación del archivo:** `first-p\src\components\Input.tsx`

```typescript
import React from 'react';

// Definición de tipos para los estilos del botón
type variant = 'primary' | 'secondary' | 'danger' | 'warning';
// Definición de tipos para los diferentes tipos de botones
type buttonType = 'button' | 'submit' | 'reset';

// Props del componente Button
type Props = {
  variant?: variant; // Tipo de botón, opcional con valor por defecto 'primary'
  children: React.ReactNode; // Contenido que se mostrará dentro del botón
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Manejo de eventos de clic, opcional
  type?: buttonType; // Tipo de botón, opcional, por defecto 'button'
};

function Button({ children, variant = 'primary', onClick, type = 'button' }: Props) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant} m-3`}>
      {children} // Contenido del botón
    </button>
  );
}

export default Button;
```

- ## 32.2) Componente ContactForm

  - **Descripción:** Este componente `ContactForm` es responsable de manejar la entrada de datos de contacto y proporciona botones para enviar y **`limpiar`** el formulario. Utiliza la biblioteca `react-hook-form` junto con Zod para la validación de los datos del formulario.
  - **Uso de methods.reset():** resetea el formulario
  - **Ubicación del archivo:** `first-p\src\components\ContactForm.tsx`

  ```typescript
  import React from 'react';
  import { useForm, FormProvider } from 'react-hook-form'; // Importación de react-hook-form
  import { zodResolver } from '@hookform/resolvers/zod'; // Importación de Zod para resolver la validación
  import { contactSchema } from '../schemas/contact'; // Importación del esquema de validación
  import Button from './Button'; // Importación del componente Button

  // Definición del tipo de contacto
  type contact = {
    // Agrega las propiedades necesarias para el contacto aquí
    name: string;
    email: string;
    message: string;
  };

  // Props del componente ContactForm
  type Props = {
    onSubmit: (contact: contact) => void; // Función de callback para manejar el envío del formulario
  };

  function ContactForm({ onSubmit }: Props) {
    // Uso de useForm para manejar el estado del formulario y la validación
    const methods = useForm<contact>({ resolver: zodResolver(contactSchema) });
    const { handleSubmit } = methods; // Desestructuración de handleSubmit del objeto methods

    return (
      <FormProvider {...methods}>
        {' '}
        // Proveedor de contexto para métodos del formulario
        <form onSubmit={handleSubmit(onSubmit)}>
          {' '}
          // Manejo del envío del formulario
          <Button type={'submit'} variant={'primary'}>
            Enviar
          </Button>
          <Button onClick={() => methods.reset()} variant={'secondary'}>
            Limpiar
          </Button>
        </form>
      </FormProvider>
    );
  }

  export default ContactForm;
  ```

  ## 33.3) Llamando al Componente `ContactForm`

  El siguiente código implementa un componente llamado `CMS` que permite gestionar contactos. Dentro de este componente, se utiliza `ContactForm` para agregar nuevos contactos a una lista y `ContactTable` (aunque no está implementado en este fragmento) para visualizar los contactos.

  - #### **u:** `first-p\src\components\CMS.tsx`

  ### Código

  ```typescript
  import { useState } from 'react';
  import ContactForm from './ContactForm'; // Importamos el formulario de contacto
  import ContactTable from './ContactTable'; // Importamos la tabla de contactos
  import { contact } from '../schemas/contact'; // Importamos el tipo de contacto

  function CMS() {
    // Estado que almacena la lista de contactos
    const [contacts, setContacts] = useState<contact[]>([]);

    // Función para agregar un nuevo contacto a la lista
    const addContact = (contact: contact) => {
      // Al agregar, se asigna un ID aleatorio y se añade al inicio de la lista
      setContacts([{ ...contact, id: Math.random().toString() }, ...contacts]);
    };

    // Función para eliminar un contacto de la lista
    const deleteContact = (id: string) => {
      // Filtramos los contactos para eliminar el que coincide con el ID
      setContacts(contacts.filter((e) => e.id !== id));
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <ContactForm onSubmit={addContact} /> {/* Llamada al componente ContactForm */}
          </div>
        </div>
        {/* Aquí podrías incluir la tabla de contactos utilizando el componente ContactTable */}
        {/* <ContactTable contacts={contacts} onDelete={deleteContact} /> */}
      </div>
    );
  }

  export default CMS;
  ```

# 33) Actualizamos el `ContactForm` para Recibir Datos

En esta sección, se actualiza el componente `ContactForm` para manejar errores de validación, pasando dichos errores al campo de entrada (`Input`). Esto permite que los errores se muestren de manera más clara en la interfaz de usuario.

- #### Código Actualizado

  ```typescript
  import { useForm, FormProvider } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { contactSchema } from '../schemas/contact'; // Importa el esquema de validación
  import Input from './Input'; // Importa el componente de entrada

  type Props = {
    onSubmit: (contact: contact) => void; // Tipo de las props
  };

  function ContactForm({ onSubmit }: Props) {
    const methods = useForm<contact>({ resolver: zodResolver(contactSchema) }); // Uso de react-hook-form con Zod para validaciones
    const {
      handleSubmit,
      formState: { errors }, // Extraemos los errores del estado del formulario
    } = methods;

    return (
      <FormProvider {...methods}>
        {' '}
        {/* Proveedor de contexto para react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Pasamos el error al componente de Input */}
          <Input name="name" errors={errors}>
            Nombre
          </Input>
          {/* Aquí se pueden agregar más campos de entrada, como "lastname", pasando también sus respectivos errores */}
          <Input name="lastname" errors={errors}>
            Apellido
          </Input>
          {/* Botón de enviar */}
          <Button type="submit" variant="primary">
            Enviar
          </Button>
          <Button onClick={() => methods.reset()} variant="secondary">
            Limpiar
          </Button>
        </form>
      </FormProvider>
    );
  }

  export default ContactForm;
  ```

  ## 33.1) Creación del Componente `Input` y forma de mostrar los errores ya que es un componente reusable

  - ### FORMA1

    En esta sección, se crea el componente `Input`, el cual está diseñado para manejar la entrada de datos del formulario y mostrar errores de validación relacionados. El componente recibe las propiedades necesarias para su funcionamiento, incluyendo el nombre del campo, el contenido que se mostrará, y los errores de validación.

    - **TEORIA**

      - **Función genérica en TypeScript (ejemplo simple):** Primero, recordemos que los tipos genéricos son una forma de escribir `funciones o componentes` que funcionan con `cualquier tipo de dato`, mientras aún mantenemos las validaciones de tipo de TypeScript. Es algo que JavaScript no hace directamente porque no tiene tipado estático, pero TypeScript lo agrega como una ventaja

        - ejemplo: en javascript normalmente se ejecutaria uuna funcion como esta

          ```js
          function getFirstElement(arr) {
            return arr[0];
          }

          console.log(getFirstElement([1, 2, 3])); // Devuelve 1
          console.log(getFirstElement(['a', 'b', 'c'])); // Devuelve 'a'
          ```

        - En TypeScript

          ```ts
          function getFirstElement<T>(arr: T[]): T {
            return arr[0];
          }

          console.log(getFirstElement([1, 2, 3])); // T será número, devuelve 1
          console.log(getFirstElement(['a', 'b', 'c'])); // T será string, devuelve 'a'
          ```

          - **< T >:** Es el tipo genérico, que se adapta al tipo del array que se le pase.
          - **T[]:** Significa que el array contiene elementos del tipo T.
          - **: T:** Esto indica que la función devuelve un valor de tipo T. en caso que no devolviera nada se colocaria `void`

          - **Relación con el tipo `FieldErrors<contact>`:** _(Es un **tipo** genérico **proporcionado por react-hook-form** que describe los errores asociados con los campos de un formulario.)_
            Ahora que entiendes los genéricos con funciones, puedes ver cómo esto se relaciona con el tipo `FieldErrors<contact>`

          - _En lugar_ de ser una función que _acepta cualquier tipo_, aquí es un **tipo** que puede contener **errores** para cualquier **tipo de objeto (en este caso, contact).**
          - En este caso, el `tipo genérico < T >` es reemplazado por tu propio tipo `contact`, que representa la estructura de los datos del formulario. Esto significa que los errores estarán relacionados con las propiedades del tipo `contact`.

            - Supongamos que tienes el siguiente tipo para los datos del formulario:

              ```ts
              type contact = {
                name: string;
                email: string;
              };
              ```

              - cuando usamos `FieldErrors<contact>`, estamos diciendo que el objeto errors tendrá las mismas propiedades que el tipo contact
              - si la Definición del _tipo_ FieldErrors es:

              ```ts
              type FieldErrors<T> = {
                [K in keyof T]?: {
                  message: string;
                };
              };
              ```

              - Cuando usas `FieldErrors<contact>`, estás creando un tipo que se ve así:

              ```ts
              const errors: FieldErrors<contact> = {
                name: {
                  message: 'Name is required',
                },
                email: {
                  message: 'Email is invalid',
                },
              };
              ```

      - **Errores con React-hook:** En react-hook-form, el objeto errors que se encuentra dentro de formState es un objeto que contiene todos los errores de validación actuales de los campos del formulario. Este objeto tiene una estructura donde `cada clave` es el `nombre del campo` y el `valor` es un objeto con detalles del error que ocurrió para ese campo (si es que hubo un error).
      - **FieldErrors<contact> :** es el tipo que indica cómo será la estructura del objeto errors en función de las reglas de validación del esquema que definiste (en este caso, el esquema de contact).
        Este tipo se importa desde react-hook-form y define un mapeo entre los nombres de los campos y los posibles errores que podrían ocurrir en esos campos.

      - Si en este ejemplo el campo name tiene un error de validación, el objeto errors podría verse así:

        ```tsx
          {
            name: {
              type: "required", // El tipo de validación que falló (en este caso, requerido)
              message: "El campo nombre es obligatorio", // El mensaje que defines en el esquema o configuración de validación
            },
            // Si no hay errores en otros campos, no aparecerán aquí
          }
        ```

      - El tipo `FieldErrors<contact>` generaría un tipo que podría tener esta estructura:

        ```Tsx
        type FieldErrors<contact> = {
          name?: {
            type: string; // El tipo de error (como "required", "min", etc.)
            message: string; // El mensaje de error
          };
          email?: {
            type: string;
            message: string;
          };
        };
        ```

    - ## continuo con la construccion de el componete input

      - **Archivo**: `first-p/src/components/Input copy.tsx`

        ### Código del Componente `Input`

        ```typescript
        import React from 'react';
        import { FieldErrors } from 'react-hook-form';
        import { contact } from '../schemas/contact'; // Asegúrate de importar el tipo de contacto

        type Props = {
          name: string; // Nombre del campo de entrada
          children: React.ReactNode; // Contenido del label o texto
          errors: FieldErrors<contact>; // Tipo para manejar errores de validación
        };

        function Input({ name, children, errors }: Props) {
          // Desestructuración de props
          return (
            <div className="mb-3">
              <label htmlFor={name} className="form-label">
                {children} {/* Muestra el texto proporcionado como children */}
              </label>
              <input
                {...register(name)} // Registra el input con el nombre correspondiente
                type="text" // Tipo de entrada, puede ajustarse según sea necesario
                id={name} // Establece el id del input para accesibilidad
                className={`form-control ${errors[name] ? 'is-invalid' : ''}`} // Aplica clase de error si existe
              />
              {/* Muestra el mensaje de error correspondiente si existe */}
              {errors[name]?.message && <p className="text-danger">{errors[name].message}</p>}
            </div>
          );
        }

        export default Input;
        ```

  - ### FORMA - 2: Uso de `getFieldState` para manejar errores en el Input

    - ### Descripción:

      En esta forma, utilizamos la funcionalidad `getFieldState` proporcionada por `react-hook-form` para obtener el estado específico de un campo del formulario, como los errores de validación, en lugar de acceder directamente al objeto `errors`. Esto nos permite controlar de manera más precisa la validación de cada campo individual dentro de los formularios.

      ### Ubicación del componente:

      - **u:** `first-p\src\components\Input.tsx`

      - ### Código del componente `Input`:

        ```typescript
        import { useFormContext } from 'react-hook-form';

        type Props = {
          name: string;
          children: React.ReactNode;
        };

        function Input({ name, children }: Props) {
          // Importamos el "formState" y la función "getFieldState" desde `useFormContext`
          const { register, formState, getFieldState } = useFormContext();

          // Obtenemos el error del atributo "name" que se pasa como prop
          const { error } = getFieldState(name, formState);

          return (
            <div className="mb-3">
              <label htmlFor={name} className="form-label">
                {children}
              </label>
              <input
                {...register(name)} // Registramos el input en el formulario
                type="text"
                id={name}
                className={`form-control ${error ? 'is-invalid' : ''}`} // Aplicamos la clase de error si existe
              />
              {/* Mostramos el mensaje de error si existe */}
              {error?.message && <p className="text-danger">{error.message}</p>}
            </div>
          );
        }

        export default Input;
        ```

# 34) Resetear Formulario con React Hook Form

### Descripción:

Hace un instante mencionamos esta parte sin embargo vamos a entrar en detalle.

El método `reset` de `react-hook-form` permite resetear un formulario a su estado inicial. Puedes resetear el formulario por completo o, si lo prefieres, asignar un valor específico a una propiedad individual.

- #### Teoria:

  `  reset():` Resetea todos los campos del formulario a su estado inicial o al estado por defecto definido.

  `reset({ name: 'luna' }):` Puedes resetear un formulario con valores específicos, en este caso, el campo name se establece con el valor "luna".

### Ubicación del componente:

- **u:** `first-p/src/components/ContactForm.tsx`

### Código del componente `ContactForm`:

```typescript
import { useForm, FormProvider } from 'react-hook-form';
import Button from './Button'; // Asumiendo que ya tienes un componente Button

type contact = {
  name: string;
  email: string;
};

function ContactForm() {
  const methods = useForm<contact>(); // Se inicializa el hook useForm
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: contact) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...methods.register('name')} placeholder="Nombre" />
        <input {...methods.register('email')} placeholder="Email" />

        {/* ----------Reseteo total del formulario */}
        <Button onClick={() => reset()} variant={'secondary'}>
          Limpiar Todo
        </Button>

        {/* ----------Reseteo total del formulario usndo methods */}
        <Button onClick={() => methods.reset()} variant={'secondary'}>
          Limpiar
        </Button>

        {/* ----------Reseteo de un solo campo o con valores personalizados */}
        <Button onClick={() => reset({ name: 'luna' })} variant={'secondary'}>
          Limpiar con Nombre "Luna"
        </Button>

        <Button type="submit" variant={'primary'}>
          Enviar
        </Button>
      </form>
    </FormProvider>
  );
}

export default ContactForm;
```

## 34.1) Especificar el Tipo de Botón (submit, button, reset)

- ### Descripción:

  Es importante asegurarse de que los botones tengan el tipo correcto especificado (`button`, `submit` o `reset`). En caso de que no se defina el tipo de botón, el navegador asigna el tipo `submit` por defecto, lo cual puede causar comportamientos no deseados en formularios con varios botones.

  - #### Teoria:

    - **Tipos de Botón (ButtonType):**

      - `button:` Un botón regular que no envía el formulario cuando se hace clic.
      - `submit:` El botón que envía el formulario.
      - `reset: `Un botón que restablece los campos del formulario a su estado inicial.

    - **Propiedades:**

      - `type:` Este define el tipo de botón (si es un botón normal, un botón de envío o un botón para resetear). Se usa el tipo button como valor por defecto.
      - `variant:` Define el estilo del botón, como primary, secondary, danger, etc. Esto se asigna dinámicamente a través de las clases CSS.
      - `onClick:` Una función opcional para manejar eventos de clic en el botón.

      - **En el caso de que se utilicen varios botones en el mismo formulario, es recomendable que:**

      - El botón de enviar tenga el tipo submit explícitamente:

      ```tsx
      <Button type="submit" variant="primary">
        Enviar
      </Button>
      ```

      - Otros botones, como el de limpiar, deben tener el tipo button o reset explícito:

      ```tsx
      <Button type="button" variant="secondary" onClick={() => methods.reset()}>
        Limpiar
      </Button>
      ```

  ### Ubicación del Componente:

  - **u:** `first-p/src/components/Button.tsx`

  ### Código del Componente `Button`:

  ```typescript
  import React from 'react';

  // Defino los tipos disponibles para el botón
  type ButtonType = 'button' | 'submit' | 'reset'; // Tipos de botón: botón común, submit, reset
  type Variant = 'primary' | 'secondary' | 'danger' | 'warning'; // Variantes de estilo para el botón

  // Defino las propiedades (Props) que aceptará el componente Button
  type Props = {
    variant?: Variant; // Estilo del botón (opcional, por defecto 'primary')
    children: React.ReactNode; // Contenido dentro del botón
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Función opcional para el evento onClick
    type?: ButtonType; // Tipo del botón (opcional, por defecto 'button')
  };

  // Función del componente Button con tipo por defecto definido como 'button'
  function Button({ children, variant = 'primary', onClick, type = 'button' }: Props) {
    return (
      <button type={type} onClick={onClick} className={`btn btn-${variant} m-3`}>
        {children}
      </button>
    );
  }

  export default Button;
  ```

# 35) Efectos en React

### Descripción y teoría

En React, los **efectos** son un concepto central cuando queremos manejar interacciones con el mundo exterior, como API calls, suscripciones o modificaciones del DOM que no se pueden hacer durante el renderizado. React ofrece el hook `useEffect` para este propósito, permitiendo a los componentes ejecutar lógica adicional después del renderizado.

En este contexto, es importante diferenciar entre **funciones puras** y **funciones impuras**:

- **Función pura:** Siempre devuelve el mismo resultado cuando recibe las mismas entradas, y no tiene efectos secundarios. Por ejemplo, un componente de React que simplemente devuelve JSX basado en `props`.
- **Función impura (efecto):** Es aquella que interactúa con elementos externos como APIs, la consola, o el local storage. Las funciones impuras generan efectos secundarios que pueden alterar el comportamiento de la aplicación más allá de su ciclo de renderizado normal.

  - Llamadas a una API REST.
  - Registro de logs en la consola.
  - Interacción con `localStorage` u otras APIs del navegador.

  ## `useEffect` en React

  El hook `useEffect` permite manejar efectos en los componentes funcionales. Aquí te describo sus características principales:

  - **Se ejecuta después de que el componente se renderiza en el DOM.** Esto significa que React primero construye y actualiza el DOM, y luego ejecuta los efectos.
  - **Función de limpieza:** El `useEffect` puede retornar una función que actúa como limpieza de efectos anteriores. Esta función de limpieza se ejecuta cuando:

    - Las dependencias cambian.
    - El componente se desmonta del DOM.

  - **Sistema de dependencias:** El hook recibe un array opcional de dependencias. Estas dependencias controlan cuándo se ejecuta el efecto.

    - Se ejecuta por primera vez tras el primer renderizado del componente.
    - Se ejecuta de nuevo cada vez que alguna de las dependencias cambia.
    - Se ejecuta para limpiar cuando React va a desmontar el componente.

      ### Ejemplo de dependencia vacía:

      Si no proporcionamos dependencias, el efecto se ejecutará con cada renderizado. Si pasamos un array vacío `[]`, solo se ejecutará una vez, cuando el componente se monte:

      ```tsx
      useEffect(() => {
        // Lógica del efecto
      }, []); // Dependencia vacía
      ```

  - **No se puede usar async/await directamente en useEffect:** Dado que el useEffect no espera una función asíncrona, debes envolver la lógica asíncrona dentro de la función o crear una función asíncrona dentro del efecto.

    - Ejemplo de uso con función asíncrona:

      ```tsx
      useEffect(() => {
        const fetchData = async () => {
          const data = await getDataFromAPI();
          console.log(data);
        };

        fetchData();
      }, []); // Dependencia vacía
      ```

  - ## 35.1) Ejecución de `useEffect` en React

    - #### Descripción

      El hook `useEffect` en React se utiliza para manejar efectos secundarios que deben ejecutarse en diferentes puntos del ciclo de vida del componente. Este hook puede configurarse para ejecutarse después del primer renderizado, cuando se desmonta un componente, o en función de dependencias específicas.

      ### 1) Ejecución de `useEffect` después del primer renderizado

      Cuando no se especifica un array de dependencias, el `useEffect` se ejecuta después de cada renderizado, incluyendo el inicial. Esto es útil cuando queremos ejecutar una acción cada vez que el componente se renderiza.

      ```tsx
      useEffect(() => {
        console.log('useEffect ejecutado', document.title);
        document.title = 'Cambié el título';
      });
      //---Comentario: En este caso, useEffect se ejecuta después de que el componente se monta y actualiza el título de la página.
      ```

      ### 2) Ejecución durante el desmontaje del componente

      Puedes retornar una función dentro de useEffect que se ejecutará justo antes de que el componente se desmonte. Esto es ideal para limpiar recursos, como suscripciones o temporizadores.

      ```tsx
      useEffect(() => {
        return () => {
          console.log('Se ejecuta durante el desmontaje del componente');
        };
      });

      //-----Comentario: Aquí el useEffect retorna una función que se ejecuta cuando el componente se desmonta, limpiando cualquier posible efecto.
      ```

      ### 3) Manejo de dependencias en useEffect

      El uso de dependencias controla cuándo se ejecuta el efecto. Si se cambian los valores de las dependencias, el efecto se vuelve a ejecutar. Debes tener cuidado de no generar bucles infinitos al modificar el estado dentro de un useEffect sin dependencias, ya que esto puede causar que el componente se re-renderice constantemente.

      - #### Ejemplo con bucle infinito:

      ```tsx
      const [user, setUser] = useState<string[]>([]);

      useEffect(() => {
        // El uso de setUser dentro del hook causará un bucle infinito
        setUser(['hola', 'mundo']); //--- Error: se renderiza y vuelve a ejecutar el efecto
      });

      return <h1>Hola mundo</h1>;

      //-----Comentario: Aquí, el useEffect provoca un bucle infinito porque cada vez que el estado user cambia, se vuelve a ejecutar el efecto, lo que a su vez vuelve a cambiar el estado y genera otro renderizado.
      ```

      - #### Solución con dependencias:
        Para evitar este problema, se deben definir dependencias que controlen cuándo debe ejecutarse el efecto:

      ```tsx
      useEffect(() => {
        setUser(['hola', 'mundo']);
      }, []); // Al pasar un array vacío, el efecto solo se ejecutará una vez.
      //-----Comentario: Al pasar un array vacío [], el efecto solo se ejecuta una vez, después del primer renderizado, evitando el bucle infinito.
      ```

      - #### 3.1) Ejecución de `useEffect` una sola vez

        - #### Descripción

        El hook `useEffect` puede configurarse para que se ejecute solo una vez, lo que es útil para inicializar datos o realizar acciones que solo deben ocurrir en el montaje del componente. Esto se logra pasando un array vacío como segundo argumento.

        - ### Ejemplo de `useEffect` ejecutándose una sola vez:

        ```tsx
        const [user, setUser] = useState<string[]>([]);

        useEffect(() => {
          console.log('Ejecutando solo una vez');
          setUser(['hola', 'mundo']);
        }, []); //--- Al agregar el array vacío, se ejecuta solo una vez al montar el componente
        ```

      - #### 3.2) Ejecución de `useEffect` cuando cambia un estado

      - ## Descripción

        El hook `useEffect` se ejecuta una vez al montar el componente y, posteriormente, se ejecutará cada vez que cambie alguna de las dependencias especificadas. Esto es útil para realizar acciones que dependen de cambios en el estado o en las propiedades.

        - ### Ejemplo de ejecución sin dependencias de estado:

          ```tsx
          const [user, setUser] = useState<string>();

          useEffect(() => {
            console.log('Ejecutando hook---', user);
          }, []); //----- Si no se coloca nada, solo se ejecuta una vez

          return ( //------- Por más que haga clic en setUser, aquí no ejecutará nuevamente el useEffect
            <button onClick={() => setUser('--nuevo estado del user--')}>Cambiar el estado</button>
            hola mundo
          );
          ```

          Retorno por consola

          ```consola
            App.tsx:9 Ejecutando hook--- undefined
            App.tsx:9 Ejecutando hook--- undefined
          ```

        - ### Ejemplo de ejecución con dependencias de estado:

          ```tsx
          const [user, setUser] = useState<string>();

          useEffect(() => {
            console.log('Ejecutando hook---', user);
          }, [user]); //----- Al agregar 'user' como dependencia, se ejecutará cada vez que 'user' cambie

          return (
            <h1>
              <button onClick={() => setUser('--nuevo estado del user--')}>
                Cambiar el estado
              </button>{' '}
              hola mundo
            </h1>
          );
          ```

          Retorno por consola

          ```consola
            App.tsx:9 Ejecutando hook--- undefined
            App.tsx:9 Ejecutando hook--- undefined
            App.tsx:9 Ejecutando hook--- --nuevo estado del user--

          ```

          - **Comentario**: En este segundo ejemplo, useEffect se ejecuta inicialmente una vez y luego cada vez que se actualiza el estado user. Al hacer clic en el botón, se cambia el estado y se muestra el nuevo valor en la consola.

# 36) Promesas (continua en el .38)

## Descripción

Las promesas en JavaScript permiten manejar operaciones asincrónicas. Estas representan un valor que puede estar disponible ahora, en el futuro o nunca. Se utiliza comúnmente en llamadas a APIs, como la función `fetch`, la cual devuelve una promesa que resuelve con la respuesta de la solicitud.

En este ejemplo, trabajamos con la API de JSONPlaceholder para obtener una lista de usuarios. El uso de promesas permite recibir y procesar datos asincrónicamente.

#### url: https://jsonplaceholder.typicode.com/users

### Teoría relevante

- **`fetch()`**: es una función nativa que realiza solicitudes HTTP y devuelve una promesa.
- **Deserialización de JSON**: el método `.json()` de la respuesta convierte los datos JSON en un objeto JavaScript.
- **Uso de tipos en TypeScript**: al convertir los datos de una API a un tipo específico, evitamos que TypeScript los trate como `any`, mejorando la seguridad y claridad del código.

### Código de ejemplo con la API de JSONPlaceholder

```tsx
import { useEffect, useState } from 'react';
import './App.css';

// Tipo para definir la estructura de un usuario
type User = {
  id: number;
  name: string;
};

function App() {
  const [user, setUser] = useState<User[]>([]); // Estado inicial como un array vacío de usuarios

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    // Realizando la solicitud a la API
    fetch(url)
      .then((response) => response.json() as Promise<User[]>) // Convertimos la respuesta a un array de 'User'
      .then((data) => {
        // Establecemos los datos en el estado
        setUser(data);
      });
  }, []); // El array vacío como dependencia garantiza que se ejecute solo una vez al montar el componente

  return (
    <>
      {user.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1> {/* Mostrando el nombre del usuario */}
        </div>
      ))}
    </>
  );
}

export default App;
```

- ### 36.2 Estado de Cargando

  #### Descripción y Teoría:

  Cuando hacemos una solicitud a una API, generalmente queremos mostrar un mensaje o indicador de que los datos están en proceso de carga. Para manejar este estado, podemos agregar un estado adicional en nuestro componente que indique si estamos "cargando" los datos (`loading`). Una vez que los datos hayan sido recuperados (o si ocurre un error), desactivamos el estado de carga.

  #### Código:

  ```tsx
  import { useEffect, useState } from 'react';
  import './App.css';

  type User = {
    id: number;
    name: string;
  };

  function App() {
    const [user, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Estado de cargando

    useEffect(() => {
      const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true); // Estado cargando activado antes de la solicitud

      fetch(url)
        .then((response) => response.json() as Promise<User[]>) // Convertimos la respuesta a un array de User
        .then((data) => {
          setUser(data); // Actualizamos el estado con los datos recibidos
        })
        .finally(() => {
          setLoading(false); // Desactivamos el estado de cargando cuando la operación termina
        });
    }, []); // Solo se ejecuta una vez, después del primer renderizado

    if (loading) {
      // Si estamos cargando, mostramos un mensaje
      return <p>Loading...</p>;
    }

    return (
      <>
        {user.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))}
      </>
    );
  }

  export default App;
  ```

- ### 36.3 Estado de Error

  #### Descripción y Teoría:

  Cuando hacemos solicitudes a una API, pueden surgir errores de diferentes tipos, como respuestas con códigos 4xx o 5xx, o incluso problemas de conexión. Es importante manejar estos errores para informar al usuario de lo que está ocurriendo y para evitar que la aplicación falle sin mostrar mensajes adecuados.

  - ¿Por qué no se maneja todo en el catch?

    - El problema es que fetch `no lanza automáticamente un error cuando recibe una respuesta HTTP con un status como 404 o 500`. Simplemente devuelve la respuesta con el código de estado, y `no considera estos códigos como errores fatales`. Por eso, necesitamos comprobar manualmente con response.ok si el código es exitoso o no.
    - Si no hacemos esta verificación, el `catch` solo capturaría `errores de red`, como una `desconexión de internet`, pero `no detectaría errores` de código `de estado HTTP`, lo que podría dejar fallos sin manejar correctamente.

      - Ejemplo sin response.ok:

        ```ts

        fetch(url)
          .then((response) => response.json())
          .catch((error) => {
            console.error('Error de red o imprevisto:', error);
          });
        Este código no capturaría un error 404 o 500, ya que fetch lo consideraría una respuesta válida (aunque no exitosa).
        ```

      - Ejemplo con manejo adecuado de errores HTTP:

        ```ts
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`${response.status}`); // Manejamos los errores de status HTTP
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error capturado:', error.message); // Capturamos tanto errores de red como HTTP
          });
        ```

    #### Continuando con el ejercicio, el codigo quedaria:

    ```tsx
    import { useEffect, useState } from 'react';
    import './App.css';

    type User = {
      id: number;
      name: string;
    };

    function App() {
      const [user, setUser] = useState<User[]>([]);
      const [loading, setLoading] = useState<boolean>(false); // Estado de cargando
      const [error, setError] = useState<string>(); // Estado de error

      useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        setLoading(true);

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              // Detectamos errores de status HTTP no exitosos
              throw new Error(`${response.status}`); // Lanzamos un error con el código de estado HTTP
            }
            return response.json() as Promise<User[]>; // Convertimos la respuesta a JSON
          })
          .then((data) => {
            setUser(data); // Actualizamos el estado de usuarios
          })
          .catch((error: Error) => {
            // Manejamos errores capturados, ya sean de red o de status HTTP
            setError(error.message); // Guardamos el mensaje de error
          })
          .finally(() => {
            setLoading(false); // Desactivamos el estado de cargando
          });
      }, []);

      if (error && !loading) {
        // Si hay un error y ya no estamos cargando, mostramos el mensaje de error
        return <p>Ha ocurrido un Error: {error}</p>;
      }

      return (
        <>
          {user.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          ))}
        </>
      );
    }

    export default App;
    ```

# 37) Custom Hooks en React

## Descripción y Teoría

En React, los **Custom Hooks** son funciones que permiten encapsular y reutilizar lógica relacionada con el estado y los efectos. Se suelen utilizar para manejar lógica compleja que puede ser repetitiva entre varios componentes, como la obtención de datos de una API o el manejo de formularios.

Por convención, los custom hooks siempre deben comenzar con la palabra `use`. Esto es necesario para que React pueda identificar correctamente el hook y gestionar el ciclo de vida de los estados y efectos asociados.

En este ejemplo, vamos a crear un custom hook llamado `useUsers` que encapsula la lógica de llamada a una API, manejo de errores y estado de carga.

## Implementación

Archivo: `effectos\src\hooks\useUsers1.ts`

```typescript
import { useEffect, useState } from 'react';

type User = {
  // Al verificar la API veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
  id: number;
  name: string;
};

export default function useUsers() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    setLoading(true); // Cuando se inicia la petición, cambiamos el estado a "cargando"

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzamos un error con el código de estado
          throw new Error(`${response.status}`);
        }
        return response.json() as Promise<User[]>;
        // Convertimos la respuesta a un tipo específico (User[]), evitando el uso de `any`
      })
      .then((data) => {
        // Aquí deserializamos el JSON y actualizamos el estado con los usuarios obtenidos
        setUser(data);
      })
      .catch((error: Error) => {
        // Capturamos cualquier error, ya sea de red o de status HTTP no exitoso
        setError(error.message);
      })
      .finally(() => {
        // Al final de la petición, sea exitosa o no, cambiamos el estado de "cargando" a false
        setLoading(false);
      });
  }, []); // Solo se ejecuta una vez, cuando se monta el componente

  // Retornamos el estado actual de "user", "loading" y "error" para ser usado en un componente
  return { user, loading, error };
}
```

- ## 37.2. Uso del Custom Hook en `App.tsx`

  - #### Descripción

    Después de crear nuestro **custom hook** `useUsers`, vamos a utilizarlo en el componente principal `App.tsx`. El hook nos proporcionará los datos de los usuarios, así como los estados de carga y de error, para poder manejarlos fácilmente en el componente.

    ## Implementación

    Archivo: `effectos\src\App.tsx`

    ```typescript
    import useUsers from './hooks/useUsers'; // Importamos el custom hook

    function App() {
      // Utilizamos el custom hook y desestructuramos los valores que retorna
      const { user, loading, error } = useUsers();

      // Si el estado de "loading" es true, mostramos un mensaje de cargando
      if (loading) {
        return <p>Loading...</p>;
      }

      // Si ocurre un error y no está cargando, mostramos el mensaje de error
      if (error && !loading) {
        return <p>Ha ocurrido un error: {error}</p>;
      }

      // Si no hay error y no está cargando, mostramos la lista de usuarios
      return (
        <>
          {user.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          ))}
        </>
      );
    }

    export default App;
    ```

# 38. Uso de `async/await` sin `.then`

## Descripción

En esta sección, mostramos cómo refactorizar el código anterior que utilizaba `.then()` para manejar promesas, sustituyéndolo por la sintaxis de `async/await` en un custom hook llamado `useUsers`. Esto mejora la legibilidad y facilita el manejo de errores y otros flujos asíncronos.

## Implementación

Archivo: `effectos\src\hooks\useUsers2.ts`

```typescript
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

export default function useUsers() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function hook() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true); // Iniciamos la carga

      try {
        const response = await fetch(url); // 1. Hacemos la solicitud con `await`
        if (!response.ok) {
          // 2. Si el status de la respuesta no es exitoso, lanzamos un error
          throw new Error(`${response.status}`);
        }
        const data: User[] = await response.json(); // 3. Esperamos el cuerpo de la respuesta y lo tipamos
        setUser(data); // 4. Actualizamos el estado con los datos obtenidos
      } catch (error) {
        setError((error as Error).message); // 5. Capturamos y manejamos los errores
      } finally {
        setLoading(false); // 6. Finalizamos la carga
      }
    }

    hook(); // Ejecutamos la función asíncrona al cargar el componente
  }, []); // Se ejecuta solo una vez al montar el componente

  return { user, loading, error }; // Retornamos los valores necesarios
}
```

## comparacion

# Comparativa de Manejo de Promesas: `fetch` con `.then()` vs. `async/await`

| **Uso de `.then()`**                       | **Uso de `async/await`**                    |
| ------------------------------------------ | ------------------------------------------- |
| ```typescript                              | ```typescript                               |
| fetch(url)                                 | const response = await fetch(url);          |
| .then((response) => {                      |                                             |
| if (!response.ok) {                        | if (!response.ok) {                         |
| throw new Error(`${response.status}`);     | throw new Error(`${response.status}`);      |
| }                                          | }                                           |
| return response.json() as Promise<User[]>; | const data: User[] = await response.json(); |
| })                                         |                                             |
| .then((data) => {                          | setUser(data);                              |
| setUser(data);                             | }                                           |
| })                                         |                                             |
| .catch((error: Error) => {                 | }                                           |
| setError(error.message);                   | catch (error) {                             |
| })                                         | setError((error as Error).message);         |
| .finally(() => {                           | }                                           |
| setLoading(false);                         | finally {                                   |
| });                                        | setLoading(false);                          |
| ```                                        | }                                           |
|                                            | ```                                         |

- ### `.then()` con Promesas

  - Cuando usas `.then()` y `catch()`, cada uno de estos métodos acepta una función como argumento. Por eso, cuando llamas a `finally`, estás pasando una función anónima (callback) que se ejecutará cuando la promesa se resuelva o sea rechazada, independientemente del resultado. Por eso, necesitas usar `() =>` (una función de flecha) para definir la función a ejecutar:

  ```javascript
  fetch(url)
    .then((response) => {
      // manejo de respuesta
    })
    .catch((error) => {
      // manejo de errores
    })
    .finally(() => {
      // este código se ejecuta al final, sin importar el resultado
      setLoading(false);
    });
  ```

- ### async/await

  - En el contexto de `async/await`, el código dentro de finally se ejecuta directamente como parte de un bloque `try/catch/finally`. Aquí, no necesitas definir una `función anónima` porque ya estás dentro de un contexto que permite ejecutar el código directamente. `Por eso, simplemente colocas el código que quieres` que se ejecute al final dentro del bloque finally:
    ```js
    try {
      const response = await fetch(url);
      // manejo de respuesta
    } catch (error) {
      // manejo de errores
    } finally {
      // este código se ejecuta al final, sin importar el resultado
      setLoading(false);
    }
    ```
  - **En el enfoque de promesas (`.then()`):** necesitas pasar funciones `(callbacks) a .then(), .catch(), y .finally()`, por lo que usas` () =>` para definir qué hacer.
  - **En el enfoque de `async/await:`** el bloque finally forma parte del bloque `try/catch`, y se ejecuta el código directamente sin necesidad de definir una función anónima.

## Descripción

Este cuadro muestra dos enfoques para manejar solicitudes asíncronas utilizando la API `fetch`. En la columna izquierda, se presenta la forma tradicional usando `.then()`, y en la columna derecha, se muestra la misma funcionalidad utilizando `async/await`.

### Ventajas del Uso de `async/await`

- **Legibilidad**: El flujo es más lineal y fácil de entender.
- **Manejo de Errores**: Es más fácil capturar errores con `try/catch`.
- **Código más limpio**: Se evitan las anidaciones de promesas, lo que mejora la mantenibilidad del código.
  `

# 39) Cancelación de Hooks con `AbortController`

### Introducción

En el punto 35 se habló de la cancelación de hooks en las dependencias. Ahora, podemos usar una función llamada `AbortController` que nos permite cancelar hooks cuando se necesite.

### Explicación y conceptos iniciales

1. **AbortController**: Se crea una instancia de `AbortController`, que permite cancelar una solicitud.
2. **Signal**: Se extrae la señal del controlador, que se pasará a la solicitud `fetch`.
3. **Fetch con Signal**: Al hacer la solicitud `fetch`, se incluye el objeto `signal` en las opciones.
4. **Manejo de Errores**: Si la respuesta no es exitosa, se lanza un error.
5. **Limpiar Errores**: Se restablece el estado de error a `undefined` cuando la solicitud es exitosa.
6. **Abortar Peticiones**: Al desmontar el componente, se llama a `controller.abort()` para cancelar la solicitud en curso.

- `Signal En useEffect:`se utiliza el signal para cancelar la solicitud cuando el componente se desmonta o cambia el url, protegiendo contra intentos de actualizar el estado en un componente no montado.
  - Función hook() en useEffect:
    - `Propósito:` Esta función se encarga de obtener datos cuando se monta el componente o cuando cambia el valor de url. Dado que la solicitud de datos puede ser cancelada si el componente se desmonta antes de que la solicitud se complete, se utiliza un `AbortController` para `asegurarse de que no se intente actualizar el estado (setData)`
- `Signal En addData:` no se usa signal porque la función se dispara manualmente por una acción del usuario y no suele ser necesario cancelarla, ya que no está vinculada al ciclo de vida del componente como en el caso de useEffect

### Implementación

- #### u: effectos/src/hooks/useUsers2.ts
  Aquí se muestra cómo se puede implementar `AbortController` en un hook personalizado para realizar solicitudes HTTP:

```typescript
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // ===================== Cambios en este punto =====================
    const controller = new AbortController(); // Creamos un controlador de abortos
    const { signal } = controller; // Obtenemos la señal del controlador
    // ===================== Fin de los cambios =====================
    async function hook() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true);
      try {
        // ===================== Cambios en este punto =====================
        const response = await fetch(url, { signal }); // Pasamos la señal al fetch
        // ===================== Fin de los cambios =====================
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Manejo de errores HTTP
        }
        const data: User[] = await response.json(); // Convertimos la respuesta a JSON
        setUsers(data); // Guardamos los usuarios
        // ===================== Cambios en este punto =====================
        setError(undefined); // Limpiamos cualquier error anterior
        // ===================== Fin de los cambios =====================
      } catch (error) {
        setError((error as Error).message); // Guardamos el mensaje de error
      } finally {
        setLoading(false); // Finalizamos el estado de carga
      }
    }

    hook(); // Ejecutamos la función hook
    // ===================== Cambios en este punto =====================
    return () => controller.abort(); // Cancela la petición si el componente se desmonta
    // ===================== Fin de los cambios =====================
  }, []); // Si no se coloca nada, solo se ejecuta una vez

  return { users, loading, error }; // Retornamos el estado y los usuarios
}
```

# 40) Custom Hook Acotado para Llamadas a Datos

### Introducción

Este hook personalizado, `useFetchData`, permite realizar solicitudes HTTP a cualquier URL y manejar el estado de los datos, la carga y los errores. Es un hook acotado, lo que significa que puede ser reutilizado para diferentes tipos de datos mediante el uso de genéricos.

### Explicación del Código

1. **Generics**: El uso de `<T>` permite que el hook sea flexible y pueda manejar diferentes tipos de datos.
2. **AbortController**: Se utiliza para cancelar solicitudes si el componente que utiliza el hook se desmonta.
3. **Fetch**: Se hace la solicitud a la URL proporcionada y se maneja la respuesta como se explicó anteriormente.
4. **Manejo de Errores**: Se captura cualquier error que ocurra durante la solicitud y se establece en el estado correspondiente.

### Implementación

- #### u: effectos\src\hooks\useFetchData.ts
  Aquí está el código para el custom hook `useFetchData`:

```typescript
import { useEffect, useState } from 'react';
// ===================== Cambios en este punto =====================
export default function useFetchData<T>(url: string) {
  const [data, setData] = useState<T[]>([]); // Estado para los datos
  // ===================== Fin de los cambios =====================

  const [loading, setLoading] = useState<boolean>(false); // Estado para la carga
  const [error, setError] = useState<string>(); // Estado para los errores

  useEffect(() => {
    const controller = new AbortController(); // Creamos un controlador de abortos
    const { signal } = controller; // Obtenemos la señal del controlador

    async function hook() {
      setLoading(true); // Indicamos que la carga ha comenzado
      try {
        const response = await fetch(url, { signal }); // Pasamos la señal al fetch //-------Esto es un objeto que se le pasa a la peticion fetch tal como se le pasan por ejemplo un POST, GET, etc

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Manejo de errores HTTP
        }
        // ===================== Cambios en este punto =====================
        const data: T[] = await response.json(); // Convertimos la respuesta a JSON
        // ===================== Fin de los cambios =====================
        setData(data); // Guardamos los datos
        setError(undefined); // Limpiamos cualquier error anterior
      } catch (error) {
        setError((error as Error).message); // Guardamos el mensaje de error
      } finally {
        setLoading(false); // Finalizamos el estado de carga
      }
    }

    hook(); // Ejecutamos la función hook
    // ===================== Cambios en este punto =====================
    return () => controller.abort(); // Cancela la petición si el componente se desmonta
    // ===================== Fin de los cambios =====================
  }, [url]); // Ahora el hook se ejecutará nuevamente si cambia la URL

  return { data, loading, error }; // Retornamos el estado y los datos
}
```

- ## 40.1) Implementación del Hook Acotado en el Componente Principal

  ### Introducción

  En este punto, implementamos el custom hook `useFetchData` dentro del componente `App.tsx`. Se pasa la URL de la API y el tipo `User` para realizar la solicitud de datos y manejar la respuesta.

  ### Explicación del Código

  1. **Tipo de Datos `User`**: Definimos un tipo para los usuarios que queremos obtener de la API. En este caso, solo nos interesa el `id` y el `name`.
  2. **Custom Hook**: Se llama al hook `useFetchData` pasando el tipo `User` para que el hook sepa qué tipo de datos debe esperar de la API.
  3. **Desestructuración de `useFetchData`**: Obtenemos los datos (renombrados como `users`), el estado de carga (`loading`) y los errores (`error`) directamente desde el hook.

  ### Implementación

  - #### u: effectos\src\App.tsx
    Aquí está el código del componente `App.tsx`:

  ```typescript
  import './App.css';
  import useFetchData from './hooks/useFetchData';

  type User = {
    //-----uso aquí mi tipo
    id: number;
    name: string;
  };

  function App() {
    //-----El código es reutilizable para diferentes tipos de datos cambiando el tipo genérico <T>.
    // ===================== Enfoque en este punto =====================
    const url = 'https://jsonplaceholder.typicode.com/users'; // URL de la API
    const { data: users, loading, error } = useFetchData<User>(url); //----le paso el url y el tipo
    // ===================== fin Enfoque en este punto =====================

    if (loading) {
      return <p>Loading...</p>; // Muestra mensaje de carga
    }

    if (error) {
      return <p>Error: {error}</p>; // Muestra mensaje de error si ocurre
    }

    return (
      <div className="App">
        <h1>Lista de Usuarios</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li> // Muestra la lista de usuarios
          ))}
        </ul>
      </div>
    );
  }

  export default App;
  ```

# 41) Agregando Elementos con "Optimistic UI"

### Introducción

En este punto, modificamos el custom hook para permitir agregar elementos a los datos con una estrategia conocida como "Optimistic UI". Esta estrategia mejora la experiencia del usuario al actualizar el estado localmente antes de realizar la llamada a la API.

### Teoría: Estrategia "Optimistic UI"

- **Convencional**:
  1. Quiero agregar un elemento.
  2. Llamo a la API para agregar el elemento.
  3. Actualizo el estado con la respuesta de la API.
- **Optimistic UI**:
  1. Quiero agregar un elemento.
  2. Actualizo inmediatamente el estado (sin esperar la respuesta de la API).
  3. Llamo a la API para guardar los cambios.
  4. Si hay un error, revierto el cambio local; si no, dejo los datos como están.

Esta estrategia proporciona una interfaz más fluida, ya que el usuario no percibe demoras en la actualización de la interfaz mientras se espera la respuesta de la API.

### Cambios en este Punto

- **Agregar Elementos**: Se añade la función `addData` que sigue la estrategia "Optimistic UI". Primero, actualizamos el estado local con el nuevo elemento, y luego hacemos la llamada a la API para guardar los datos. Si ocurre un error, revertimos el estado al valor anterior.
- **Provisional ID**: Se asigna un ID provisional al nuevo elemento antes de recibir la confirmación de la API.

### Implementación

- #### effectos\src\hooks\useHttpData.ts
  Aquí está el código del hook `useHttpData` con la funcionalidad de agregar elementos:

```typescript
import { useEffect, useState } from 'react';

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function hook() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T[] = await response.json();
        setData(data);
        setError(undefined);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    hook();
    return () => controller.abort();
  }, [url]);

  // Función para agregar elementos usando la estrategia Optimistic UI
  const addData = async (element: T) => {
    const initialData = [...data]; // Guardamos los datos iniciales
    setData([{ id: 0, ...element }, ...data]); // Agregamos el nuevo elemento con un ID provisional

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(element),
      });

      if (!response.ok) {
        setData(initialData); // Si hay un error, revertimos al estado original
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const saveData = await response.json();

      // Si la API devuelve el objeto completo con el ID, actualizamos el estado con los nuevos datos
      setData([saveData, ...initialData]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { data, loading, error, addData };
}
```

# 42) Borrando Elementos

### Introducción

En este punto, hemos añadido la funcionalidad para borrar elementos de la lista de datos. Sin embargo, surgió un problema: el tipo `T` no reconocía el campo `id` que estaba presente en el tipo `User`. Para solucionarlo, se extendió `T` con una interfaz `ID`.

### Problema Detectado

El tipo genérico `T` no reconocía el campo `id` a pesar de que `User` tenía este campo. Esto generaba un error al intentar acceder a `id` en la función de borrado. La solución fue crear una interfaz `ID` que contiene el campo `id` y extender `T` desde esta interfaz.

- Aquí tienes un ejemplo sencillo en TypeScript sobre cómo extender una interfaz:

  ```ts
  // Definimos una interfaz base
  interface Persona {
    nombre: string;
    edad: number;
  }

  // Extendemos la interfaz Persona
  interface Empleado extends Persona {
    salario: number;
  }

  // Ahora podemos crear un objeto de tipo Empleado que tiene todas las propiedades de Persona y la nueva propiedad 'salario'
  const empleado: Empleado = {
    nombre: 'Juan',
    edad: 30,
    salario: 50000,
  };

  console.log(empleado);
  ```

### Implementación

- #### effectos\src\hooks\useHttpData.ts
  Aquí está el código actualizado del hook `useHttpData` con la funcionalidad de borrar elementos:

```typescript
import { useEffect, useState } from 'react';

// Interfaz que asegura que el tipo T siempre tenga un campo 'id'
interface ID {
  id: number | string;
}

export default function useHttpData<T extends ID>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function hook() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T[] = await response.json();
        setData(data);
        setError(undefined);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    hook();
    return () => controller.abort();
  }, [url]);

  // Función para borrar un elemento
  const deleteData = async (id: number) => {
    const initialData = [...data]; // Guardamos los datos iniciales por si hay que revertir
    setData(data.filter((element) => element.id !== id)); // Filtramos el elemento por su ID

    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setData(initialData); // Si hay un error, revertimos al estado original
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { data, loading, error, addData, deleteData };
}
```

# 43) Actualizando elementos

- #### Archivo: `effectos/src/hooks/useHttpData.ts`

### Código:

```typescript
const updateData = async (updatedElement: T) => {
  const initialData = [...data];
  setData(data.map((el) => (el.id === updatedElement.id ? updatedElement : el)));
  try {
    const response = await fetch(`${url}/${updatedElement.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedElement),
    });
    if (!response.ok) {
      setData(initialData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    setError((error as Error).message);
  }
};
```

- ## 43.2) Llamando la función `updateData` en el componente App

  #### Archivo: `effectos/src/App.tsx`

  ### Código:

  ```typescript
  const { updateData: updateUser } = useHttpData<User>(url);

  return <button onClick={() => updateUser({ id: 1, name: 'chanchoooo' })}>update 11</button>;
  ```

# 44) Uso de AXIOS en vez de `fetch.then` y `fetch` con `async/await`

## Archivo:

`proyecto-meal-finder.txt`

### 3) Uso de AXIOS

#### Introducción:

AXIOS es una biblioteca para hacer solicitudes HTTP. A diferencia de `fetch`, AXIOS ofrece una API más sencilla y maneja automáticamente la conversión de respuestas a JSON. A continuación, se presentan ejemplos de cómo usar AXIOS en lugar de `fetch`.

### Ejemplo con `fetch.then`:

```javascript
fetch('https://api.example.com/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
```

#### Ejemplo con fetch y async/await:

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
```

#### Ejemplo con AXIOS:

```js
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('There was a problem with the AXIOS operation:', error);
  }
}
```

#### Ventajas de usar AXIOS:

Simplificación de código: Menos líneas de código para manejar respuestas y errores.
Transformación automática de datos: AXIOS convierte automáticamente la respuesta a JSON.
Intercepción de solicitudes y respuestas: Permite modificar o manejar errores de manera centralizada.

---

# Teoría React

## 1. Actualización de estado

React lo primero que hace es verificar la información que se actualizará.
Ejemplo: `setCount(count + 1);` Luego actualiza los estados en su totalidad, pero lo hace **cuando se renderiza**. Por eso, cuando imprimo inmediatamente:

```javascript
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  console.log('count:', count); // "count: 0"
};

//---- En el segundo render, sí podría aparecer: // "count: 1"
```

## 2. Hooks

En el nivel más alto (es decir, no anidado), se deben colocar los hooks y nunca anidados dentro de un `if, for, while,` ya que así React no puede hacer seguimiento de los estados.

- `useState:` detecta el estado.
- `useRef: `si hay un cambio en un elemento con ese useRef, toma ese valor.

## 3. Estado de memoria

En React, no es recomendable tener variables que queden en memoria. Ejemplo:

- #### u: `react-app2/src/App.tsx`

```js
import { useState } from 'react';
let variableFuera = 0; //---- variable que quedará en memoria
function App() {
  const handleClick = () => {
    variableFuera = variableFuera + 1; //---- aumentándole valor a variable
  };
}
```

- **Problema:**
  Si vuelvo a usar este componente, o quiero volver a usarlo, entonces esa variable también quedará con el dato anterior, o sea, no quedará separada. Por eso es mejor usarlo como hook.

## 4. Detalles del useState para modificar arrays y objetos, mutables e inmutables

Algo muy importante es que React, en su useState, no va a modificar un estado si lo que se hace es pasarle el mismo estado inicial pero modificado.

```js
function App() {
  const [products, setProducts] = useState([
    { name: 'shoes', price: 20 },
    { name: 'shirts', price: 30 },
  ]);
  const handleClick = () => {
    products.push({ name: 'pants', price: 40 }); //---- aquí le pasa el mismo "products"
    setProducts(products); // pero ahora lo modificado, entonces React no vuelve a renderizar, y solo cuando vuelva a renderizar mostrará ese valor
  };
  return (
    <>
      {products.map((product) => (
        <h1>{product.name}</h1> //------ solo renderiza shoes y shirts así presione el botón
      ))}
      <button onClick={handleClick}>Enviar</button>
    </>
  );
}
```

- #### **Estado de arrays**

  Para arreglar esto, la forma es pasarle un nuevo array. Podría tomar el array anterior y colocarlo en una nueva variable:

  - Formas alternativas

    - // Forma 1

    ```js
    const handleClick = () => {
      products.push({ name: 'pants', price: 40 });
      // 🖐️ let newProducts = products;  //------ OJO aquí no crea un nuevo array, NO HACERLO ASÍ
      let newProducts = [...products]; //------ aquí creo un nuevo array
      setProducts(newProducts);
    };
    ```

    - Forma 2:

    ```js
    javascript;

    const handleClick = () => {
      let newProducts = [...products, { name: 'pants', price: 40 }];
      setProducts(newProducts);
    };
    ```

    - Forma 3:

    ```js
    javascript;

    const handleClick = () => {
      let newProducts = products.concat({ name: 'pants', price: 40 });
      setProducts(newProducts);
    };
    ```

    - Forma 4:

    ```js
    javascript;

    const handleClick = () => {
      setProducts((previEstadoDeProducts) => [
        ...previEstadoDeProducts,
        { name: 'pants', price: 40 },
      ]);
    };
    ```

- #### Ejemplo para objetos

  ```js
  const [user, setUser] = useState({ name: 'Carlos', lastName: 'Pérez' });
  const handleClick = () => {
    setUser({ ...user, name: 'JuanCambiado' }); //----- cambiando el estado del objeto
  };
  ```

## 5. Para poner un estado de array en vacío

- Ejemplo:

  ```javascript
  const empty = () => {
    setProducts([]);
  };
  ```

## 6. Comportamiento en formularios, refresca automáticamente

- ejemplo

  ```javascript
  event.preventDefault(); // esto l
  ```

## 7. Agregando una propiedad a un tipo (interface)

- Si por ejemplo quiero agregar a una interface otro campo, puedo agregarlo con "&". Ejemplo:

  ```javascript
  type Props = {
    name: string,
    children: React.ReactNode,
  } & { id: string };

  // en el ejercicio
  // first-p/src/schemas/contact.ts
  export type contact = z.infer<typeof contactSchema> & { id: string };
  ```

## 8. Valor por defecto en las propiedades cuando se le pasa a componentes (parecido a Enum)

```js
// first-p/src/components/Button.tsx
//--- estos son los valores que tendrá como aceptables
type variant = 'primary' | 'secondary' | 'danger' | 'warning';

type Props = {
  variant?: variant, //---- se crea esa interface
  children: React.ReactNode,
};

//---------- variant se le pasa aquí en las props y tendrá como defecto "primary"
function Button({ children, variant = 'primary' }: Props) {
  return (
    <button type="submit" className={`btn btn-${variant} m-3`}>
      {children}
    </button>
  );
}
```

## 9. Agregando un enum en la validación (datos por defecto)

- ```js
  // first-p/src/schemas/contact.ts
  export const contactSchema = z.object({
    type: z.enum(['Familiar', 'Trabajo', 'Amigo', 'Otros']),
  });
  ```
  Si quiero hacer que esos datos queden en una constante, entonces:
- ejemplo

  ```javascript

  const contactTypeOptions = [
      'Familiar',
      'Trabajo',
      'Amigo',
      'Otros'
  ] as const; //--- se le indica que será una constante, y es así como Zod permite

  export const contactSchema = z.object({
      ...
      type: z.enum(contactTypeOptions), //--- aquí entonces se pasa la variable
  });


  ```

  - #### Error

  ```rust
    The type 'readonly ["Familiar", "Trabajo", "Amigo", "Otros"]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.

  ```

  - Esto significa que en el Select: `first-p/src/components/Select.tsx` podría que al ser un `string[]` es mutable.

    - al llamar al select se le pasa las opciones

    ```ts
    <Select
      options={contactTypeOptions}
      defaultMessage={'--selecciona el typo--'}
      label={'Tipo '}
      name={'type'}
    ></Select>
    ```

    - el error se produce porque:
    - #### u: `first-p\src\components\Select.`

    ```ts
    type Props = {
      options: string[]; //--- esto es mutable entonces
      // como es un enum "readonly"
      // debo indicarle que este string es "readonly"
      defaultMessage: string;
      label: string;
      name: string;
    };

    function Select({ options, defaultMessage, label, name }: Props) {
      //---resto d e codigo}
    }
    ```

  - #### Solución:

  ```ts
  type Props = {
    options: readonly string[]; //----aqui se coloca Readonly
    defaultMessage: string;
    label: string;
    name: string;
  };
  // ---Solución:
  function Select({ options, defaultMessage, label, name }: Props) {
    //---resto d e codigo}
  }
  ```

## 10. Exportar formas

- **forma1**
  - **Exporta:**`export function CardBody(props: CardBodyProps) {}`
  - **Importa:** `  import { CardBody } from './components/Card';`
- **forma2**

  - **Exporta:**`export default Card;`
  - **Importa:**` import Card from './components/Card';`

- **Importando de las dos maneras:**
  `import Card, { CardBody } from './components/Card';`

## 11. Teclados o comandos visuales

- `CTRL + D:` Seleccionar varios textos iguales.
- `CTRL + Espacio: `Muestra opciones.
- `CTRL + ALT + R:` Permite sacar las opciones de snippets (abreviatura para crear código de React).
- `Shift + CTRL + P: `Busca Wrap y permite envolver con una etiqueta.

## 12. Trucos de HTML: EMET de Visual Studio Code me ayuda

- Para crear un formulario:

  ```plaintext
  form>div.mb-3\*2>label.form-label+input#name.form-control

  ```

  #### Resultado:

  - ejemplo:

  ```html
  <form action="">
    <div className="mb-3">
      <label htmlFor="" className="form-label"></label>
      <input type="text" id="name" className="form-control" />
    </div>
    <div className="mb-3">
      <label htmlFor="" className="form-label"></label>
      <input type="text" id="name" className="form-control" />
    </div>
  </form>
  ```

  - Para crear un botón:

    ```plaintext

      button.btn.btn-primary
    ```

## 13. Snippets

`**tsrfce:**` Crea un componente funcional de React.

- `**Interfaces**`
  Contiene el nombre y el tipo de las propiedades que se le pasan a una función o las variables para saber qué tipo son. Las interfaces se pueden definir:

- **Forma 1:**

```javascript
type Props = {};
```

- **Forma 2:**

```javascript

interface Props = {};
```

## 14. Eventos

- **onClick:** Este es el mismo onClick de HTML.

  ```html
  <li onClick={() => console.log('evento', elemento)} key={elemento} className="list-group-item"
  value={elemento} >
  ```

  - 16.2 Identificar Tipo de Evento

    - Si no conoces el tipo de evento, puedes situarte sobre la variable y el IDE indicará su tipo.
    - Ejemplo:
      ```jsx
      onClick={(e) => handleClick()}
      //----Al posicionarte sobre e, verás algo como React.MouseEvent<HTMLLIElement, MouseEvent>.
      ```

  - **onChange:**Se utiliza principalmente en formularios. Se activa cuando el valor de un elemento de formulario cambia. Por ejemplo, en un campo de entrada:

  ```jsx
  <input type="text" onChange={handleInputChange} />
  ```

  - **onSubmit:** Este evento se utiliza en formularios y se activa cuando se envía un formulario. Es importante prevenir el comportamiento predeterminado del formulario para evitar la recarga de la página. Aquí tienes un ejemplo:

  ```jsx
  <form onSubmit={handleSubmit}>
    <input type="text" />
    <button type="submit">Submit</button>
  </form>
  ```

## 15 contexto en React

Es una herramienta útil para compartir datos `(como el tema de la aplicación o el estado de autenticación)` entre componentes sin tener que pasar las `props `manualmente en cada nivel.

- Ejemplo de Flujo de Contexto en React
  Supongamos que tenemos una aplicación donde queremos compartir un tema `("dark" o "light")` entre varios componentes. Vamos a definir un contexto para este tema y lo vamos a consumir en un componente anidado.
- Paso 1: Crear el contexto

  ```jsx
  import React, { createContext, useContext, useState } from 'react';
  const ThemeContext = createContext('light');
  //------ Paso 2: Definir el proveedor de contexto
  const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
  };
  ```

- Paso 3: Consumir el contexto en un componente

  ```jsx
  const DisplayTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
      <div>
        El tema actual es: {theme}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Cambiar tema</button>
      </div>
    );
  };
  ```

- Componente principal donde usamos el ThemeProvider

  ```jsx
  const App = () => (
    <ThemeProvider>
      <DisplayTheme />
    </ThemeProvider>
  );

  export default App;
  ```

## 17. Uso de Variables en Atributos HTML de React

- Uso de Llaves
  Para utilizar variables en los atributos de HTML, usa llaves `{}.`
  ```jsx
  className={`list-group-item ${elemento === '1' ? 'active' :
  ```

## 18. Símbolos Usados en React

- Optional Chaining (?.)

  Permite acceder a propiedades de objetos anidados de manera segura. Si la propiedad no existe, devuelve undefined en lugar de lanzar un error, evita que el código se rompa si la variable no está definida.

  ```javascript
  const usuario = { perfil: { nombre: 'Carlos' } };
  console.log(usuario.perfil?.nombre); // Carlos
  console.log(usuario.perfil?.edad); // undefined (sin error)
  ```

- Null Propagation (??) o - Nullish Coalescing (??)

  Se usa para devolver un valor alternativo cuando el valor original es null o undefined.

  ```javascript
  const valor = null ?? 'Valor predeterminado';
  console.log(valor); // Valor predeterminado
  ```

  Retorna el valor de la `derecha` solo si el valor de la izquierda es `null o undefined`. A diferencia de` ||`, que considera `0`, `''`, y false como falsy, `??` solo considera `null y undefined`.

  ```javascript
  const nombre = '';
  const saludo = nombre ?? 'Anónimo';
  console.log(saludo); // '' porque nombre NO es null ni undefined
  //----ejemplo2
  const cantidad = 0;
  const resultado = cantidad ?? 10;
  console.log(resultado); // Imprime 0, ya que `??` solo reemplaza null o undefined
  ```

- Logical OR (||)

  Retorna el **primer** valor `truthy`**o** el **último** valor `si ninguno` es truthy. Puede usarse como valor predeterminado.

  - por ejemplo:
    `null, undefined` , `""`o `0 `es considerado un valor `"falsy"` Esto significa que, cuando se usa en una evaluación con el operador ||, se tratará como si fuera false. Aquí tienes algunos ejemplos que muestran cómo se comporta 0 con el operador ||:

  ```javascript
  const nombre = '' || 'Anónimo';
  console.log(nombre); // 'Anónimo' porque '' es falsy
  //-----------ejmplo2
  const puntaje = 0;
  const puntajeFinal = puntaje || 100;
  console.log(puntajeFinal); //----Imprime 100, ya que `puntaje` es falsy

  //--------------ejempo3
  const nombreUsuario = usuarioNombre || 'Anónimo';
  console.log(nombreUsuario); // Si `usuarioNombre` es falsy, imprimirá "Anónimo"
  ```

- Spread Operator (...)

  Expande elementos de un `array, objeto o string`. En React, se usa para pasar `props` y actualizar el estado de forma inmutable.

  ```javascript
  const array1 = [1, 2, 3];
  const array2 = [...array1, 4, 5];
  console.log(array2); // [1, 2, 3, 4, 5]

  const objeto1 = { a: 1, b: 2 };
  const objeto2 = { ...objeto1, b: 3 };
  console.log(objeto2); // { a: 1, b: 3 }
  ```

- Rest Parameters (...)

  Similar al operador spread, pero utilizado para `agrupar argumentos en una función` o en desestructuración.

  ```javascript
  function sumar(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
  }
  console.log(sumar(1, 2, 3, 4)); // 10
  ```

- Ternary Operator (? :)

  Simplifica expresiones condicionales. Muy común en JSX para renderizado condicional.

  ```javascript
  const esVisible = true;
  return <div>{esVisible ? 'Visible' : 'Oculto'}</div>;
  ```

- Short-circuit Evaluation (&&)

  Ejecuta el segundo operando solo si el primero es truthy. Útil para renderizado condicional sin ternarios.

  ```javascript
  const mensaje = 'Hola';
  return <div>{mensaje && <p>{mensaje}</p>}</div>; // Renderiza <p>Hola</p>
  ```

- Exclamación Doble (!!)

  Convierte valores a booleanos. Útil para verificar la existencia de un valor.

  ```javascript
  const existe = !!variable;
  console.log(existe); // true si variable tiene algún valor
  ```

- Object Destructuring ({ })

  Extrae propiedades de objetos en variables individuales.

  ```javascript
  const { nombre, edad } = { nombre: 'Carlos', edad: 30 };
  console.log(nombre); // Carlos
  ```

- Array Destructuring ([ ])

  Extrae elementos de un array en variables individuales.

  ```javascript
  const [primero, segundo] = [1, 2, 3];
  console.log(primero, segundo); // 1, 2
  ```

## 19. Convenciones en React

La función que recibe un evento se llama `onSelect()`.
La función que manda el evento se llama `handleSelect`.

```jsx
<List data={list} onSelect={handleSelect} />
```

## 20. React: Conceptos Clave

#### 20.1 State y Props

- **State:** Puede mutar.
- **Props:** Son inmutables.

#### 20.2 Truthy y Falsy

- **&&** se usa para mostrar valores según la condición de la izquierda.
- Ejemplos:

  ```jsx
  {
    123 && 'numeros ';
  } // Imprime 'numeros'
  {
    '' && 'string vacio';
  } // No imprime nada
  {
    0 && 'soy cero';
  } // No imprime 'soy cero'
  {
    list2.length !== 0 && 'si hay algo en la lista';
  }
  ```

## 22. Infraestructura en React

Guardar componentes como `index.tsx` permite importarlos sin especificar el nombre del archivo.

```jsx
import Button from './components/Button';
```

`

## 23. Componentes React

`<React.StrictMode>`

- Detecta posibles errores y verifica que el componente sea puro.
  - **Función pura:** Siempre retorna el mismo valor.
  - **Función impura:** Puede devolver valores diferentes.
- Detecta funcionalidades deprecadas.

## 24. HTML en React

#### Atributo `for`

En React, usa htmlFor en lugar de for.

```jsx
<label htmlFor="exampleInputEmail1" className="form-label">
```

## 25. Métodos en JavaScript

#### slice

Crea un nuevo array con elementos seleccionados.

```js
const arr = [1, 2, 3, 4, 5];
const newArr = arr.slice(1, 3); // [2, 3]
```

#### join

Une todos los elementos de un array en un solo string.

```js
const array = ['1', '2', '3', 'Carlos'];
console.log(array.join(' ')); // "1 2 3 Carlos"
```

#### Date

Obtener el tiempo actual:

```js
new Date().getTime();
```

## 26. Desestructuración en JavaScript

### 26.1 Desestructuración Anidada

Extraer propiedades de objetos anidados:

```js
const {
  address: { city, country },
} = person;
```

### 26.2 Cambiar Nombre al Desestructurar

Cambiar el nombre de las variables al desestructurar.

```js
const { data: users, addData: addUser } = useHttpData < User > url;
```

## 27. Recorrer Objetos por Clave

Para recorrer un objeto e imprimir cada clave:

```jsx
{
  Object.entries(errors).map(([fieldName, error]) => <p key={fieldName}>{error.message}</p>);
}
```

## 28. Comandos de Instalación

**--save:** Instala la dependencia para nuevos proyectos.

## 29. Conceptos de UI

#### Términos Clave

- `header:` Cabecera de la página.
- `sideNav:` Barra de navegación lateral.
- `skeleton:` Estado de carga.
- `layout:` Disposición de todos los elementos visuales.

## 30. HTML en React

#### 30.1 Calculando Medidas en CSS

Calcular la altura total de la pantalla:

```jsx
height = 'calc(100vh - 60px)';
```

#### 30.2 Agregar Lógica a Atributos

Usar lógica en atributos HTML en React:

```jsx

<Link {...(selected.strCategory === category.strCategory && selectedProps)}>
```

#### 30.3 Posiciones en CSS

- **Relative:** Elementos internos pueden ser absolute.
- **Fixed:** Elemento fijo en pantalla.
- **Sticky:** Elemento se fija cuando alcanza el top.

```jsx

pos="sticky" top="60px"
```

#### 30.4 Overflow en Eje Y

- **overflowY="auto"** permite scroll en el eje vertical.
