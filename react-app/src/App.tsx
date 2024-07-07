import { useState } from 'react';
import Card, { CardBody } from './components/Card';
import Button from './components/Button';
import List from './components/List';

function App() {
  const list = ['Goku', 'vegeta', 'krilim', 'gohan', 'picoro'];
  const list2: string[] = [];

  const handleSelect = (elemento: string) => {
    console.log('Imprimiendo', elemento);
  };

  const contenido = (e: string) =>
    list2.length ? (
      <>
        <h1>hola la longitud si existe</h1>
        <h1>hola la longitud si existe y el dato recolectado es: {e}</h1>
        <List data={list} onSelect={handleSelect} />
      </>
    ) : (
      ''
    );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {123 && 'numeros '}
      {'hay string' && ' string texto'}
      {undefined && 'sundefined'}
      {null && 'null'}
      {false && 'false'}
      {'' && 'string vacio'}
      {0 && 'soy cero '}
      {list2.length && 'si hay algo en la lista'}
      {list2.length !== 0 && 'si hay algo en la lista'}
      <CardBody title={'titulo'} text="mi texto es " />;{/* <Card body="Hola soy body" /> */}
      <Card>
        <CardBody title={'titulo'} text="mi texto es " />
        <List data={list} onSelect={handleSelect} />
        {contenido('yo soy el dato ')}

        <Button isLoading={isLoading} onClick={handleClick}>
          press here
        </Button>

        <button
          onClick={handleClick}
          disabled={isLoading}
          type="button"
          className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
        >
          {isLoading ? 'cargando...' : 'presiona'}
        </button>
      </Card>
    </div>
  );
}
export default App;
