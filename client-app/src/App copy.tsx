import './App.css'
import DuckItem from './DuckItem';
import { ducks } from './demo';

const App = () => {
  return (
    <>
      <h1>Reactivities</h1>
      {ducks.map((duck)=>(
        <DuckItem key={duck.name} duck={duck} />
      ))}
    </>
  )
}
 
export default App;