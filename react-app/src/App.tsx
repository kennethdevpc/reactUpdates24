import Card, { CardBody } from './components/Card';
import List from './components/List';

function App() {
  const list = ['Goku', 'vegeta', 'krilim', 'gohan', 'picoro'];

  const handleSelect = (elemento: string) => {
    console.log('Imprimiendo', elemento);
  };
  const handleSelect2 = (elemento: string) => {
    console.log('Texteando', elemento);
  };
  return (
    <div>
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
