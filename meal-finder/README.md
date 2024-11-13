# Implementación con Chakra UI

## Recursos

- [Chakra UI Documentation - Card Usage](https://v2.chakra-ui.com/docs/components/card/usage)

## Instalación de Dependencias

```bash
npm i @chakra-ui/react@2.8.2 @emotion/react@11.11.4 @emotion/styled@11.11.5 framer-motion@11.1.7 axios@1.6.8 react-icons@5.0.1 react-hook-form@7.51.3
```

- Estructura de Componentes

# 1)Creación de Componentes

```txt
  meal-finder/src/components/Categories.tsx
  meal-finder/src/components/Header.tsx
  meal-finder/src/components/MainContent.tsx
  meal-finder/src/components/MealCard.tsx
  meal-finder/src/components/SideNav.tsx
```

- **Nota Importante** Como Chakra UI y otros frameworks incluyen un componente Modal, para evitar confusiones con el modal de Chakra, se creará un componente con un nombre diferente:

  `meal-finder/src/components/RecipeModal.tsx`

# 2) Creación de la Grilla

Una **grilla** (o grid en inglés) es un sistema de diseño que permite organizar elementos en filas y columnas, creando una estructura visualmente coherente y ordenada para una página web.

### Ubicación de los archivos:

`meal-finder\src\App-sinCustomhook.tsx`  
`meal-finder\src\App-sinhook.tsx`

```tsx
//----------el height se hace un pequeño cálculo para que tome el
//----- resto de altura y solo le resta la altura de 60px que sería el del header
import { useState } from 'react';
import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from './components/Header';
import SideNav from './components/SideNav';
import MainContent from './components/MainContent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"`}
      gridTemplateRows={'60px 1fr'}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
    >
      <GridItem pl="2" bg="orange.300" area={'header'}>
        <Header></Header>
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={'nav'} height="calc(100vh - 60px)">
        <SideNav></SideNav>
      </GridItem>
      <GridItem pl="2" bg="green.300" area={'main'}>
        <MainContent></MainContent>
      </GridItem>
    </Grid>
  );
}

export default App;
```

# 3) Uso de AXIOS

### API:

[https://www.themealdb.com/](https://www.themealdb.com/)

### Notas:

Se construye un custom hook para traer datos utilizando Axios. Este enfoque se puede probar inicialmente en el archivo `App.tsx`.

### Ubicación del archivo:

`meal-finder\src\App-sinCustomhook.tsx`

```tsx
// const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    axios
      .get(url, { signal })
      // .then((re) => { //----sin destructuración
      .then(({ data }) => {
        // setData(re.data.meals); //----sin destructuración
        setData(data.meals);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort(); // Cancelar la solicitud al desmontar el componente
  }, []);

  return <div>{loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}</div>;
}

export default App;
```

# 4) Definición de Tipos

Para evitar valores `undefined` y asegurarnos de que el tipo de datos sea correcto, vamos a crear un archivo de tipos.

### Crear el directorio y archivo:

- **Directorio**: `meal-finder\src\types`
- **Archivo**: `index.ts`

### Definición de los Tipos:

```ts
// Definición del tipo Category
export type Category = {
  strCategory: string; // Nombre de la categoría
};

// Definición de la respuesta de las categorías
export type CategoriesResponse = {
  meals: Category[]; // Array de categorías
};
```

## 4.1) Agregar Tipos al Código

Ahora que ya hemos definido los tipos en `index.ts`, es momento de integrarlos en nuestro código para garantizar que la data y las respuestas de la API tengan el tipo correcto.

### Modificar `App-sinCustomhook.tsx`:

En el archivo `meal-finder\src\App-sinCustomhook.tsx`, vamos a agregar los tipos de datos a las variables y las respuestas de la API.

### Código Modificado:

```tsx
// Importación de los tipos
import { Category, CategoriesResponse } from './types';

// Definimos el estado de la data con el tipo Category[]
const [data, setData] = useState<Category[]>([]); // La data va a ser un arreglo de Category

// Hacemos la solicitud con Axios y especificamos que la respuesta es del tipo CategoriesResponse
axios
  .get<CategoriesResponse>(url, { signal }) // La respuesta del API es de tipo "CategoriesResponse"
  .then(({ data }) => {
    setData(data.meals); // Asignamos los datos de las categorías a la variable 'data'
  })
  .finally(() => {
    setLoading(false); // Finaliza la carga
  });
```

# 5) Pasar las Categorías al `SideNav` y Listarlas Usando `Stack` de Chakra UI

En este paso, vamos a pasar las categorías obtenidas de la API al componente `SideNav` y listarlas usando el componente `Stack` de Chakra UI.

## Código Modificado en `App-sinCustomhook.tsx`:

```tsx
<SideNav categories={data} loading={loading}></SideNav>
```

## 5.1) Crear el componente `SideNav`

**Ubicación del archivo:** `meal-finder\src\components\SideNav.tsx`
En este paso, creamos el componente `SideNav`, que recibirá las categorías y el estado de carga como propiedades y las mostrará utilizando los componentes de Chakra UI.

### Descripción:

En este paso, creamos el componente `SideNav`, que recibirá las categorías y el estado de carga como propiedades y las mostrará utilizando los componentes de Chakra UI.

- **Categorías:** El componente `SideNav` recibe un arreglo de categorías como prop y las muestra en un `VStack` de Chakra UI.
- **Estilos Condicionales:** Se aplica un estilo especial a la categoría seleccionada (por ejemplo, un fondo azul y texto en blanco).
- **Componentes de Chakra UI:** Utilizamos `Heading`, `Link`, y `VStack` para organizar y estilizar la lista de categorías.

## Código del Componente `SideNav`:

```tsx
import React from 'react';
import { Category } from '../types';
import { Box, Heading, Link, StackDivider, VStack } from '@chakra-ui/react';

type Props = {
  categories: Category[];
  loading: boolean;
};

const selectedProps = {
  bgColor: 'blue.400',
  color: 'white',
  fontWeight: 'bold',
};

function SideNav({ categories, loading }: Props) {
  //-----esto se borrara solo se pone para validar que se ponga en azul , peor esta logica no es
  const selected = {
    strCategory: 'Beef',
  };

  return (
    <>
      <Heading color="green.400" fontSize={12} fontWeight="bold" mb="4">
        Categories
      </Heading>
      <VStack align="stretch">
        {categories.map((category) => (
          <Link
            _hover={{ textDecoration: 'none' }}
            key={category.strCategory}
            h="40px"
            bg="yellow.200"
            px={2}
            py={1}
            borderRadius="5"
            //------el destructuting que se hace aqui (...), es porque si se genera true entonces se entrega el objeto de propiedades o estilos
            {...(selected.strCategory === category.strCategory && selectedProps)}
          >
            {category.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
```

## 5.2) Opción de que cuando se hace clic en un botón, se cambia de color a azul

**Ubicación del archivo:** `meal-finder\src\App-sinCustomhook.tsx`

### Descripción:

En este paso, agregamos una funcionalidad para que, cuando se haga clic en un elemento de la lista de categorías, se cambie su estilo a un color azul para indicar que ha sido seleccionado.

- **Estado de Selección:** Creamos un estado `selectedCategory` que mantiene la categoría actualmente seleccionada.
- **Propagación de Estado:** Pasamos este estado y la función para actualizarlo (`setSelectedCategory`) al componente `SideNav`.
- **Estilos Condicionales:** En `SideNav`, aplicamos un estilo especial a la categoría seleccionada (color de fondo azul).

## Código para manejar el estado de selección y pasar las props:

```tsx
// En el archivo App-sinCustomhook.tsx
import React, { useState, useEffect } from 'react';
import { Category } from './types';
import SideNav from './components/SideNav';

const App = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //-------""selectedCategory"" es de tipo "Category", ""setSelectedCategory" es de tipo (category:Category)=>void
  const [selectedCategory, setSelectedCategory] = useState<Category>({ strCategory: 'Beef' });

  // Código para cargar las categorías usando axios o el método de tu elección...

  return (
    <div>
      <SideNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={data}
        loading={loading}
      />
    </div>
  );
};

export default App;
```

### 5.2.2) Agregar las propiedades al componente `SideNav` para manejar el cambio de estado

**Ubicación del archivo:** `meal-finder\src\components\SideNav.tsx`

### Descripción:

En este paso, vamos a actualizar el componente `SideNav` para que reciba las propiedades necesarias para manejar el estado de la categoría seleccionada. Esto permitirá que, al hacer clic en un enlace, el estado de la categoría seleccionada se actualice y se resalte con un estilo diferente.

### Cambios realizados:

1. Se agregaron las propiedades `selectedCategory` y `setSelectedCategory` en el componente `SideNav`.
2. Se implementó una función de `onClick` para cambiar el estado de la categoría seleccionada al hacer clic en una categoría.
3. Se añadió un estilo condicional para resaltar la categoría seleccionada.

## Código actualizado para el componente `SideNav`:

```tsx
import React from 'react';
import { Category } from '../types';
import { Box, Heading, Link, StackDivider, VStack } from '@chakra-ui/react';

// Agregamos las propiedades para la categoría seleccionada y la función para actualizarla
type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category; // Nueva propiedad que indica la categoría seleccionada
  setSelectedCategory: (category: Category) => void; // Nueva propiedad que permite cambiar el estado de la categoría seleccionada
};

const selectedProps = {
  bgColor: 'blue.400',
  color: 'white',
  fontWeight: 'bold',
};

function SideNav({ categories, loading, selectedCategory: selected, setSelectedCategory }: Props) {
  return (
    <>
      <Heading color="green.400" fontSize={12} fontWeight="bold" mb="4">
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories.map((category) => (
          <Link
            _hover={{ textDecoration: 'none' }}
            key={category.strCategory}
            h="40px"
            bg="yellow.200"
            px={2}
            py={1}
            borderRadius="5"
            // Aquí agregamos una lógica para cambiar los estilos si la categoría está seleccionada
            {...(selected.strCategory === category.strCategory && selectedProps)} // Resalta la categoría seleccionada
            onClick={() => setSelectedCategory(category)} // Actualiza el estado de la categoría seleccionada al hacer clic
          >
            {category.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
```

# 6) Agregar Skeleton (barra de carga) para las categorías mientras se cargan los datos

**Ubicación del archivo:** `meal-finder\src\App-sinCustomhook.tsx`

### Descripción:

En este paso, vamos a agregar un componente `Skeleton` para mostrar una barra de carga mientras se están cargando las categorías de la API. Utilizaremos el componente de Chakra UI para mostrar un "placeholder" de las categorías mientras los datos están siendo recuperados.

### Cambios realizados:

1. **Se agregó un estado de `loading`:** Para controlar cuándo estamos esperando los datos, de forma que mientras se hace la solicitud, mostramos un esqueleto (skeleton) en lugar de las categorías.
2. **Se utilizó `Skeleton` de Chakra UI:** Mientras `loading` es `true`, se muestran las barras de carga; cuando los datos se hayan cargado, se muestran las categorías.
3. utilizaremos un flag para el skeleton:

## Código actualizado para el componente `App`:

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { Category, CategoriesResponse } from './types';
import Header from './components/Header';
import SideNav from './components/SideNav';
import MainContent from './components/MainContent';

function App() {
  const [data, setData] = useState<Category[]>([]); // Estado para almacenar las categorías
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [selectedCategory, setSelectedCategory] = useState<Category>({ strCategory: 'Beef' }); // Estado para la categoría seleccionada
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'; // URL para obtener las categorías

  useEffect(() => {
    let ignore = false; // Bandera para evitar actualizaciones de estado después de que se complete el primer ciclo

    const controller = new AbortController();
    const { signal } = controller;

    axios
      .get<CategoriesResponse>(url, { signal }) // Realizamos la solicitud para obtener las categorías
      .then(({ data }) => {
        if (!ignore) {
          // Si no hemos cancelado la solicitud, actualizamos el estado
          setData(data.meals);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false); // Cuando la carga termina, cambiamos el estado de 'loading' a false
        }
      });

    // Cleanup: Abortamos la solicitud si el componente se desmonta antes de que termine
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  return (
    <Grid
      templateAreas={`"header header"
                    "nav main"`}
      gridTemplateRows={'60px 1fr '}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
      fontSize={14}
    >
      <GridItem pl="2" bg="orange.300" area={'header'}>
        <Header />
      </GridItem>
      <GridItem p="5" area={'nav'} height="calc(100vh - 60px)">
        {/* Aquí mostramos el Skeleton mientras los datos están cargando */}
        {loading ? (
          <Skeleton height="40px" />
        ) : (
          <SideNav
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={data}
            loading={loading}
          />
        )}
      </GridItem>
      <GridItem pl="2" bg="green.300" area={'main'}>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;
```

## 6.0) Explicación del uso del flag para manejar la cancelación de peticiones

**Ubicación del archivo:** `meal-finder\src\App-sinCustomhook.tsx`

### Descripción:

El uso de un **flag** (en este caso, la variable `ignore`) es una técnica común para evitar que una promesa se resuelva o se actualice el estado después de que el componente se haya desmontado o se haya ejecutado una nueva petición. Esto es particularmente importante cuando trabajas con peticiones HTTP (como con `axios`), ya que el ciclo de vida del componente puede hacer que la promesa continúe ejecutándose incluso después de que el componente haya dejado de existir en el DOM, lo que puede llevar a errores o advertencias en la consola.

### Flujo Detallado:

- si se ejecuta el useEffect entonces puede pasar que se `ejecute el aborto ` `return () => {controller.abort();};` con lo cual haria que se `ejecutara el finally` `sin` que se `complete el get,` con lo cual pasaria a `falso el loading,`, entonces la idea es que si se `ejecuta el aborto` tendria que quedarse en `cargando` o en otros terminos no podria ni hacer `setData `ni `setLoading(false)`, porque se desmonta y si se desmonta significa que no hay ni datos y pues deberia quedarse en `cargando`, entonces para que no se ponga el `setLoading(false) ` debo hacer que cuando se aborte haya una variable que no deje que se llegue al `setLoading(false) `, por eso se pone el `let ignore = false; `, ya que si se aborta , pues entonces se pondria en `let ignore = TRUE; ` y como esta en true pues se hace que si esta en `true` en el codigo como es negado `if (!ignore) {setLoading(false);}`, entonces si se pone en TRUE no entraria a poner en `false` a el estado de cargando

#### strickmode

- lo que yo entiendo es que se ejecuta dos veces con el `strickmode` una vez con el abort y otra vez sin el abort, osea verificando el asincronismo puede ser que se ejecute `primero el aborto `y que no se finalice la peticion con `axios`, y **otra que puede pasar** es que se ejecute `completamente` la peticion de `axios` y `luego el aborto`

## Contexto:

En React, cuando se ejecuta en modo estricto (`StrictMode`), el ciclo de vida del componente se simula ejecutándose dos veces en el entorno de desarrollo para identificar posibles efectos secundarios y asegurar que el código maneje correctamente las dependencias y el estado. Esto puede influir en cómo las peticiones asincrónicas, como las realizadas con `axios`, interactúan con la limpieza (`cleanup`) del efecto.

## ¿Qué ocurre en `StrictMode`?

Cuando un componente utiliza un `useEffect` para realizar una petición HTTP, el comportamiento observado en `StrictMode` puede incluir los siguientes escenarios:

1. **Primera Ejecución con Limpieza (Abort):**

   - React ejecuta el `useEffect` por primera vez.
   - Si el componente se desmonta o React realiza una simulación, se ejecuta la función de limpieza (`cleanup`), cancelando la petición con `controller.abort()`.
   - En este caso, la promesa de `axios` no se resuelve completamente porque la petición fue abortada.

2. **Segunda Ejecución Completa:**
   - React vuelve a ejecutar el `useEffect` tras la simulación.
   - Esta vez, la petición `axios` se completa correctamente y resuelve la promesa, permitiendo que el bloque `then` se ejecute.

#### **Primera Ejecución del `useEffect`:**

1. Se lanza la petición de `axios` para obtener los datos.
2. Antes de que la petición finalice, el `useEffect` se limpia, lo que podría ocurrir si el componente se desmonta o si el componente se re-renderiza (por ejemplo, debido a un cambio de estado).
3. La limpieza del `useEffect` se realiza mediante `controller.abort()`, que cancela la petición.
4. Dado que la petición se ha cancelado, la promesa no se resuelve exitosamente, por lo que el bloque `then` no se ejecuta.
5. El bloque `finally` se ejecuta, pero debido a que la bandera `ignore` ya está en `true`, se evita que el estado del componente se actualice (es decir, no se realiza un `setData` ni `setLoading`).

#### **Segunda Ejecución del `useEffect`:**

1. Dependiendo de la lógica de la aplicación, es posible que haya una segunda ejecución del `useEffect`, como resultado de un cambio en el estado del componente o de un nuevo renderizado.
2. En esta segunda ejecución, se lanza una nueva petición de `axios`.
3. Esta vez, la petición se completa antes de que la función de limpieza del `useEffect` se ejecute.
4. La promesa se resuelve correctamente, y el bloque `then` se ejecuta. El log muestra que el `then` se ejecutó con éxito.
5. El bloque `finally` también se ejecuta, y en este caso, `ignore` permanece en `false`, lo que permite que se realicen actualizaciones en el estado del componente.

### Ejemplo de flujo de ejecución:

**Primera Ejecución:** si quitaramos el `"strickmode"` ahi si solo se ejecutaria la primera ejecucion, peor no se puede quitar porque es mejor usas el "strickmode"

- `cero then false time: 226.564` → El `useEffect` empieza.
- `3er return false time: 226.564` → La función de limpieza se ejecuta, cancelando la petición.
- `2do finally true time: 226.564` → La promesa se cancela y el bloque `finally` se ejecuta.

**Segunda Ejecución:**

- `cero then false time: 476.526` → El `useEffect` se ejecuta nuevamente.
- `1er then false time: 476.526` → La petición completa correctamente y el bloque `then` se ejecuta.
- `2do finally false time: 476.526` → La promesa se completa y el bloque `finally` se ejecuta con `ignore` como `false`.

### ¿Por qué usar este flag (`ignore`)?

El flag `ignore` sirve para asegurar que solo se realicen actualizaciones en el estado si la petición fue exitosa y si el componente aún está montado. Esto previene actualizaciones de estado innecesarias después de que el componente se haya desmontado, evitando errores como **"Cannot perform a state update on an unmounted component"**.

El uso de este flag garantiza que el flujo de la aplicación sea controlado correctamente, evitando que el componente intente actualizar su estado después de que el ciclo de vida haya finalizado.

## Código de ejemplo con el flag:

```tsx
useEffect(() => {
  let ignore = false; // Bandera para evitar actualizaciones si el componente está desmontado

  const controller = new AbortController();
  const signal = controller.signal;

  axios
    .get<CategoriesResponse>(url, { signal })
    .then(({ data }) => {
      if (!ignore) {
        setData(data.meals);
      }
    })
    .finally(() => {
      if (!ignore) {
        setLoading(false);
      }
    });

  return () => {
    ignore = true; // Cuando el componente se desmonte, cambia la bandera para evitar actualizaciones
    controller.abort(); // Cancela la petición si el componente se desmonta
  };
}, []);
```

## 6.1) Agregar Skeleton al componente `SideNav` para manejar el estado de carga

**Ubicación del archivo:** `meal-finder\src\components\SideNav.tsx`

### Descripción:

En este paso, vamos a integrar el componente `SkeletonText` de Chakra UI dentro del componente `SideNav` para mostrar un esqueleto mientras se están cargando las categorías. Utilizaremos una condición para que, si el estado de `loading` es `true`, se muestre el esqueleto; si es `false`, se mostrará el contenido real.

### Cambios realizados:

1. **Se agregó un condicional `loading`:** Dentro del componente `SideNav`, se verifica el estado `loading` para mostrar el `SkeletonText` mientras se cargan los datos.
2. **Uso de `SkeletonText`:** Cuando el estado de carga es `true`, se renderiza el componente `SkeletonText` con algunas configuraciones. En cuanto los datos estén listos, se muestra la lista de categorías.

## Código actualizado para el componente `SideNav`:

```tsx
import { SkeletonText, Link, VStack, Heading } from '@chakra-ui/react';
import { Category } from '../types';

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

function SideNav({ categories, loading, selectedCategory: selected, setSelectedCategory }: Props) {
  return loading ? (
    // SkeletonText se muestra mientras 'loading' es verdadero
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  ) : (
    <>
      <Heading color="green.400" fontSize={12} fontWeight="bold" mb="4">
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories.map((category) => (
          <Link
            key={category.strCategory}
            h="40px"
            bg={selected.strCategory === category.strCategory ? 'blue.400' : 'yellow.200'}
            px={2}
            py={1}
            borderRadius="5"
            onClick={() => setSelectedCategory(category)}
            _hover={{ textDecoration: 'none' }}
            color={selected.strCategory === category.strCategory ? 'white' : 'black'}
            fontWeight={selected.strCategory === category.strCategory ? 'bold' : 'normal'}
          >
            {category.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
```

# 7) Custom Hook para Manejo de Datos de API

Este hook está diseñado para manejar peticiones HTTP reutilizables, pensado para obtener datos de APIs con respuestas similares. Especificaciones como la gestión de estados (`loading`, `data`, `error`) y el uso de `AbortController` para cancelar peticiones están incluidas.

- #### Descripción:

  Para usar este hook que sirva para varios casos, es importante notar que las dos APIs devuelven resultados en el mismo formato.

  - como ambas devuelven sus respuestas dentro de meal por eso se puee colocar
    en el
    ```ts
    axios.get<{ meals: T[] }>(url, { signal });
    ```

  #### API1 de Categorías:

  `https://www.themealdb.com/api/json/v1/1/list.php?c=list`

  **Respuesta esperada:**

  ```json
  {
    "meals": [
      {
        "strCategory": "Beef"
      },
      {
        "strCategory": "Chicken"
      }
    ]
  }
  ```

  #### API2 filtro de una categoria:

  [https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood](`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)

  **Respuesta esperada:**

  ```json
  {
    "meals": [
      {
        "strMeal": "Baked salmon with fennel & tomatoes",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
        "idMeal": "52959"
      },
      {
        "strMeal": "Cajun spiced fish tacos",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
        "idMeal": "52819"
      }
    ]
  }
  ```

## Hook Personalizado: `useHttpData`

#### Ubicación del archivo:

`meal-finder\src\hooks\useHttpData.ts`

#### Descripción:

Este hook personalizado se utiliza para manejar peticiones HTTP en múltiples casos y trabaja con estructuras de respuesta consistentes. Implementa un manejo adecuado de asincronía y limpieza utilizando `AbortController`.

## Código:

```typescript
import { useEffect, useState } from 'react';
import { CategoriesResponse, Category } from '../types';
import axios from 'axios';

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    console.log('---cero then', ignore, 'time:', document.timeline.currentTime);

    axios
      .get<{ meals: T[] }>(url, { signal })
      // .then((re) => { //----sin destructuración
      .then(({ data }) => {
        console.log('---1er then', ignore, 'time:', document.timeline.currentTime);
        // setData(re.data.meals); //----sin destructuración
        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setData(data.meals);
        }
      })
      .finally(() => {
        console.log('---2do finally', ignore, 'time:', document.timeline.currentTime);

        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setLoading(false);
        }
      });

    return () => {
      console.log('---3er return ', ignore, 'time:', document.timeline.currentTime);

      ignore = true; //----cuando se sale o termina el proceso (la 1era vez) entonces pone en true para que no vuelva a ejecutar el set de React
      controller.abort();
    };
  }, []);

  return { data, loading };
}
```

## 7.1) Eliminación de Tipo `CategoriesResponse`

#### Ubicación del archivo:

`meal-finder\src\types\index.ts`

#### Descripción:

El tipo `CategoriesResponse` ya no es necesario porque su estructura (`meals: T[]`) ahora se define directamente en la llamada de Axios: `axios.get<{ meals: T[] }>(url, { signal })`.

#### Código:

```typescript
// export type CategoriesResponse = {
//   meals: Category[];
// };
//--- Ya no se necesita porque ya se define en axios.get<{meals: T[]}>(url, {signal})
```

## 7.2) Uso del Custom Hook en `App.tsx`

#### Ubicación del archivo:

`meal-finder\src\App.tsx`

#### Descripción:

Aquí se utiliza el custom hook `useHttpData` para obtener los datos de la API y manejar el estado de carga. El hook se usa pasando la URL de la API como parámetro, y luego se extraen `data` y `loading` del hook.

#### Código:

```typescript
function App() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [selectedCategory, setSelectedCategory] = useState<Category>({ strCategory: 'Beef' });
  const { data, loading } = useHttpData<Category>(url);
  return (
    <Grid
      templateAreas={`"header header"
                   "nav main"`}
      gridTemplateRows={'60px 1fr '}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
      fontSize={14}
    >
      ...
    </Grid>
  );
}
```

#### hasta aqui se podria tener el mismo funcionamiento pero con el **_custom hook_**

---

## 7.3) LLamando la daa de la [API2 de Meals](https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood)Creación del tipo `Meal` para la URL de la API de Meals

#### Ubicación del archivo:

`meal-finder\src\types\index.ts`

#### Descripción:

Aquí se crea el tipo `Meal`, el cual se utiliza para definir la estructura de los datos que se obtendrán de la API de Meals. Aunque se utiliza el nombre `Meal`, se podría usar otro nombre dependiendo de las necesidades del proyecto.

#### Código:

```typescript
export type Meal = {
  //-----se le coloco el mismo nombre del objeto pero perfectamente se podria otro nombre
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};
```

#### 7.3.2) Uso de la URL dinámica con el Custom Hook para la API de Meals

### Descripción:

Se crea una función pequeña `makeMealUrl` que toma una categoría y la agrega dinámicamente al URL para hacer una solicitud a la API. Esta función se usa para actualizar la URL de la API según la categoría seleccionada y se pasa al custom hook `useHttpData`.

#### Ubicación del archivo:

`meal-finder\src\types\index.ts`

### Código:

```typescript
const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const defaultCategory: Category = { strCategory: 'Beef' }; // Categoría por defecto

// Función para crear la URL dinámica con la categoría seleccionada
const makeMealUrl = (category: Category) =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);
  const { data, loading } = useHttpData<Category>(url);
  // Usando el custom hook con la URL dinámica para obtener los datos de las comidas
  const { data: dataMeal, loading: loadingMeal } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  console.log('data:', { dataMeal });

  return <Grid>{/* Más contenido */}</Grid>;
}
```

# 8) Carga de las "meals" de cada categoría, usamos la data del punto 7)

### Ubicación del archivo:

`meal-finder\src\App.tsx`

### Descripción:

Se pasa la información de las comidas (`meals`) obtenidas mediante el custom hook al componente `MainContent`. Este componente maneja el estado de carga (`loadingMeal`) y los datos (`dataMeal`) para mostrarlos en la interfaz.

### Código:

```typescript
...
<MainContent loading={loadingMeal} meals={dataMeal}></MainContent>
...
```

## 8.1) Agregar nuevos props al componente `MainContent`

### Ubicación del archivo:

`meal-finder\src\components\MainContent.tsx`

### Descripción:

Se añaden los nuevos props `loading` y `meals` al componente `MainContent` para manejar el estado de carga y renderizar las comidas obtenidas. El componente utiliza el diseño proporcionado por `Chakra UI` para mostrar las comidas en un diseño en cuadrícula con tarjetas.

### Código:

```typescript
import React from 'react';
import { Meal } from '../types';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

type Props = {
  loading: boolean;
  meals: Meal[];
};

function MainContent({ loading, meals }: Props) {
  console.log('meals:', meals, loading);
  return (
    <>
      <SimpleGrid columns={[1, 2, null, 3]} spacing="40px">
        {meals.map((meal) => (
          <Card maxW="sm" key={meal.idMeal} boxShadow="lg">
            <CardBody>
              <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md" color="blue.400">
                  <Text mt="4">{meal.strMeal}</Text>
                </Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque-inspired spaces, earthy
                  toned spaces, and for people who love a chic design with a sprinkle of vintage
                  design.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  $450
                </Text>
              </Stack>
            </CardBody>
            <CardFooter pt={0}>
              <ButtonGroup spacing="2">
                <Button colorScheme="white" bgColor={'blue.400'}>
                  Ver Receta
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
```

## 8.2) Uso de `boxShadow`, `position`, `overflowY` y estilos relacionados en el componente `GridItem`

### Ubicación del archivo:

`meal-finder\src\App.tsx`

### Descripción:

Se aplican estilos avanzados de diseño y posicionamiento al componente `GridItem`, incluyendo `overflowY`, `position` (`sticky`), y ajustes de dimensiones. Esto asegura que el contenido dentro del `GridItem` permanezca fijo en su posición mientras permite el desplazamiento vertical.

#### 30.3 Posiciones en CSS

- **Relative:** Elementos internos pueden ser absolute.
- **Fixed:** Elemento fijo en pantalla.
- **Sticky:** Elemento se fija cuando alcanza el top.

### Código:

```typescript
//----para el header
<GridItem
          pos="sticky"
          top={0}
          zIndex={1}
          pt="7px"
          bg="white"
          boxShadow="lg"
          area={'header'}
        >
          <Header onSubmit={searchApi}></Header>
        </GridItem>
//----para el sidenav

<GridItem
  overflowY="auto"      // Permite desplazamiento vertical si el contenido excede la altura disponible.
  pos="sticky"          // Hace que el elemento permanezca fijo en su posición relativa al contenedor.
  top="60px"            // Define el desplazamiento desde el borde superior del contenedor.
  left="0px"            // Define el desplazamiento desde el borde izquierdo del contenedor.
  p="5"                 // Aplica padding al contenido del `GridItem`.
  area={'nav'}          // Especifica la área del grid donde se posicionará este elemento.
  height="calc(100vh - 60px)" // Ajusta la altura para que ocupe todo el espacio restante menos el header.
>
```

# 9) Creación de los Componentes `MealCard` y `SkeletonCard`

### Descripción:

Para mejorar la organización y modularidad del código, se ha extraído la lógica de presentación de cada comida y el esqueleto de carga en componentes separados llamados `MealCard` y `SkeletonCard`, respectivamente. Esto permite mantener el componente `MainContent` más limpio y enfocarse solo en la lógica de renderización.

### Ubicación del archivo:

` meal-finder\src\components\MainContent.tsx`

### Código de `MainContent.tsx`:

```typescript
import React from 'react';
import { Meal } from '../types';
import MealCard from './MealCard';
import { SimpleGrid } from '@chakra-ui/react';
import SkeletonCard from './SkeletonCard';

type Props = {
  loading: boolean;
  meals: Meal[];
};

function MainContent({ loading, meals }: Props) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <SimpleGrid columns={[1, 2, null, 3]} spacing="20px">
        {loading && skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
        {!loading && meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
```

## 9.1) Creación del Componente `MealCard`

### Ubicación del archivo:

`meal-finder\src\components\MealCard.tsx`

### Descripción:

El componente `MealCard` es responsable de mostrar los detalles de una comida. Este componente recibe una prop `meal` que contiene la información de la comida, como el nombre y la imagen, y la presenta en una tarjeta con botones de acción.

### Código del Componente `MealCard`:

```typescript
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Meal } from '../types';

type Props = {
  meal: Meal;
};

function MealCard({ meal }: Props) {
  return (
    <Card maxW="sm" boxShadow="lg">
      <CardBody>
        <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md" color="blue.400">
            <Text mt="4">{meal.strMeal}</Text>
          </Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
            spaces and for people who love a chic design with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup spacing="2">
          <Button colorScheme="white" bgColor={'blue.400'}>
            Ver Receta
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default MealCard;
```

## 9.2) Creación del Componente `SkeletonCard`

### Ubicación del archivo:

`meal-finder\src\components\SkeletonCard.tsx`

### Descripción:

El componente `SkeletonCard` se utiliza para mostrar un esqueleto de carga mientras los datos de las comidas están siendo cargados. Este esqueleto actúa como un marcador de posición antes de que los datos reales sean renderizados.

### Código del Componente `SkeletonCard`:

```typescript
import { Card, CardBody, SkeletonText } from '@chakra-ui/react';

function SkeletonCard() {
  return (
    <>
      <Card maxW="sm" boxShadow="lg">
        <CardBody>
          <SkeletonText mt="1" noOfLines={1} spacing="4" skeletonHeight="100" />
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="4" />
        </CardBody>
      </Card>
    </>
  );
}

export default SkeletonCard;
```

# 10) Creación de la Barra de Búsqueda

### Ubicación del archivo:

`meal-finder\src\components\Header-sinschema.tsx`

#### Descripción:

Este componente `Header` incluye una barra de búsqueda que permite a los usuarios buscar comidas mediante palabras clave, como "chicken" o "beans". Utiliza el componente `Input` de Chakra UI y un ícono de búsqueda de `react-icons` para proporcionar una interfaz de usuario intuitiva.

#### Código del Componente `Header`:

```typescript
import { InputGroup, InputLeftElement, Stack, Input, Container } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

type Props = {};

function Header({}: Props) {
  return (
    <Container mt="1" maxW="3xl">
      <Stack spacing={1} pl={10} pr={10}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiSearch color="blue" size={50} />
          </InputLeftElement>
          <Input type="tel" placeholder="Intenta con 'chicken' o 'beans'" />
        </InputGroup>
      </Stack>
    </Container>
  );
}

export default Header;
```

## 10.1) luego podemos hacer la validaciones con reack form

### Ubicación del archivo:

`u: meal-finder\src\types\index.ts`

- creo el typo de la respuesta que tendre del formulario
  ```ts
  export type SearchForm = {
    search: boolean;
  };
  ```

### 10.1.2) Implementación del Componente `Header` con Validación de Búsqueda y el uso de `React Hook Form`

### Ubicación del archivo:

`meal-finder\src\components\Header.tsx`

### Descripción:

Este componente `Header` incluye una barra de búsqueda con un formulario que valida la entrada del usuario antes de enviarla. Se utiliza la librería `react-hook-form` para gestionar el formulario y las validaciones de los campos.

### Código del Componente `Header`:

```typescript
import { InputGroup, InputLeftElement, Stack, Input, Container, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { SearchForm } from '../types';

type Props = {
  onSubmit: (data: SearchForm) => void;
};

function Header({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchForm>(); //---se agrega el useForm para poder utilizarlo en el formulario

  return (
    <Container mt="1" maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiSearch color="blue" size={50} /> {/*--se agrega un icono*/}
          </InputLeftElement>
          <Input
            mr={5}
            //-----cambia el color del borde

            focusBorderColor={errors.search ? 'red.500' : 'blue.500'}
            //---se agrega para que se muestre el borde rojo si es invalido la informacion "isInvalid" si es  TRUE  entonces pone en rojo, "errors.search " no es boolean con lo cual se ussa "!!" por si existe entonces pondria "TRUE"  si no existe pondria "false"

            isInvalid={!!errors.search}
            //---se agrega el register para que se pueda registrar el campo al "useForm"

            {...register('search', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
            type="tel"
            placeholder="Intenta con 'chicken' o 'beans'"
          />
          <Button color="white" type="submit" bgColor="blue.400">
            Buscar
          </Button>
          {errors.search && <span>{errors?.search?.message}</span>}
        </InputGroup>
      </form>
    </Container>
  );
}

export default Header;
```

# 11) Búsqueda en la API con los datos del formulario

### Ubicación del archivo:

`meal-finder\src\components\Header.tsx`

### Descripción:

Aquí se implementa la funcionalidad para realizar la búsqueda en la API usando los datos del formulario. El formulario de búsqueda en el componente `Header` captura el término de búsqueda y lo envía para buscar en la API de comidas.

### Código actualizado del componente `Header`:

```typescript
type Props = {
  onSubmit: (data: SearchForm) => void;
};

function Header({ onSubmit }: Props) {
  // ...
  return (
    <Container mt="1" maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>{/* Aquí está el formulario con el input */}</form>
    </Container>
  );
}
```
