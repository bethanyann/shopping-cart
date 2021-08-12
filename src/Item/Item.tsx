import Button from '@material-ui/core/Button';
//Types
import { CartItemType } from '../App';
//Styles
import { Wrapper } from './Item.styles';

//have to type out the props in typescript
type Props = {
    item: CartItemType;
    handleAddToCart: ( clickedItem: CartItemType) => void;
}

//React.FC is the type of a react functional component & Props is the type we're passing in
//this is how you 'type' the props in a typescript react functional component
//destructure the props 
const Item: React.FC<Props> = ({ item, handleAddToCart}) => (
    //return jsx here
    <Wrapper>
        <img src={item.image} alt={item.title}/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        {/* inline arrow function is used for the onclick event so as to not trigger the handle method right away */}
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
     </Wrapper>
)

export default Item;