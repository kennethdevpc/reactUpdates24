import Card, { CardBody } from './components/Card';
import List from './components/List';

function App() {
  const list = ['Goku', 'vegeta', 'krilim', 'gohan', 'picoro'];
  const list2: string[] = [];

  const handleSelect = (elemento: string) => {
    console.log('Imprimiendo', elemento);
  };
  const handleSelect2 = (elemento: string) => {
    console.log('Texteando', elemento);
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
        <List data={list} onSelect={handleSelect2} />
      </Card>
    </div>
  );
}
export default App;
