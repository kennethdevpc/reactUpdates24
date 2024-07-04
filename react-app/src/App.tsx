import Card, { CardBody } from './components/Card';
import List from './components/List';

function App() {
  const list = ['Goku', 'vegeta', 'krilim', 'gohan', 'picoro'];

  return (
    <div>
      <CardBody title={'titulo'} text="mi texto es " />;{/* <Card body="Hola soy body" /> */}
      <Card>
        <CardBody title={'titulo'} text="mi texto es " />
        <List data={list} />
      </Card>
    </div>
  );
}
export default App;
