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
