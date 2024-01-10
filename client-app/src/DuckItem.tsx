import { Duck } from "./demo";

interface Props {
    duck: Duck
}

const DuckItem = ({duck}: Props) => {
    return ( 
        <div key={duck.name}>
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + ' quack')}>Make a sound</button>
        </div> 
    );
}
 
export default DuckItem;