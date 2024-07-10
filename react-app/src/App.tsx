import { useState } from 'react';
import Card, { CardBody } from './components/Card';
import Button from './components/Button';
// import List from './components/List';
// import Alert from './components/Alert';

function App() {
  //----------------------------------------------------
  const [sent, setSent] = useState<boolean>(false);
  const handleClick = () => {
    setSent(true);
  };

  return (
    <Card>
      <Button sent={sent} onClick={handleClick}>
        Enviar Children
      </Button>
    </Card>
  );

  //----del punto  23 para atras----------
  // const [data, setData] = useState<string[]>(['Goku', 'vegeta', 'krilim', 'gohan', 'picoro']);

  // const handleSelect = (elemento: string) => {
  //   console.log('presiono sobre ', elemento);
  // };

  // const addMinion = () => {
  //   setData([...data, 'Minion']);
  // };
  // const delMinion = () => {
  //   setData(data.slice(0, data.length - 1));
  // };

  // const [status, setStatus] = useState<boolean>(false);
  // const toggleStatus = () => {
  //   setStatus(!status);
  // };
  // return (
  //   <Card>
  //     <Button isLoading={true} onClick={addMinion}>
  //       Agregar
  //     </Button>
  //     <Button isLoading={false} onClick={delMinion}>
  //       Eliminar
  //     </Button>
  //     <List data={data} onSelect={handleSelect}></List>

  //     <Alert onClick={toggleStatus} status={status}>
  //       Alerta
  //       <h2>hola soy una alerta</h2>
  //       <Button isLoading={false} onClick={delMinion}>
  //         Eliminar
  //       </Button>
  //     </Alert>
  //   </Card>
  // );
  //----------------------------------------------------
  //----del punto  17 para  atras----------
  //   const list = ['Goku', 'vegeta', 'krilim', 'gohan', 'picoro'];
  //   const list2: string[] = [];
  //   const handleSelect = (elemento: string) => {
  //     console.log('Imprimiendo', elemento);
  //   };
  //   const contenido = (e: string) =>
  //     list2.length ? (
  //       <>
  //         <h1>hola la longitud si existe</h1>
  //         <h1>hola la longitud si existe y el dato recolectado es: {e}</h1>
  //         <List data={list} onSelect={handleSelect} />
  //       </>
  //     ) : (
  //       ''
  //     );
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const handleClick = () => {
  //     setIsLoading(true);
  //   };
  //   return (
  //     <div>
  //       {123 && 'numeros '}
  //       {'hay string' && ' string texto'}
  //       {undefined && 'sundefined'}
  //       {null && 'null'}
  //       {false && 'false'}
  //       {'' && 'string vacio'}
  //       {0 && 'soy cero '}
  //       {list2.length && 'si hay algo en la lista'}
  //       {list2.length !== 0 && 'si hay algo en la lista'}
  //       <CardBody title={'titulo'} text="mi texto es " />;{/* <Card body="Hola soy body" /> */}
  //       <Card>
  //         <CardBody title={'titulo'} text="mi texto es " />
  //         <List data={list} onSelect={handleSelect} />
  //         {contenido('yo soy el dato ')}
  //         <Button isLoading={isLoading} onClick={handleClick}>
  //           press here
  //         </Button>
  //         <button
  //           onClick={handleClick}
  //           disabled={isLoading}
  //           type="button"
  //           className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
  //         >
  //           {isLoading ? 'cargando...' : 'presiona'}
  //         </button>
  //       </Card>
  //     </div>
  //   );
  //----del punto  17 para  atras----------
}
export default App;
