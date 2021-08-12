import { useState } from 'react';
import { useQuery } from 'react-query';
//components go here
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//styles
import { StyledWrapper, StyledButton } from './App.styles';

//Types
export type CartItemType =
{
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

//fetching function for the store api
//Promise is generic so we give it the return type that we want from the api call which is CartItemType as an array
const getProducts = async (): Promise<CartItemType[]> => {
  //the first await is going to be when we convert it to JSON and the second await is for the API call itself
  return await(await fetch('https://fakestoreapi.com/products')).json();
}

const App =() => {
  //setting out a few states we will need for our cart behavior (open or not)
  const [cartOpen, setCartOpen] = useState(false);

  //setting out states we will need for the items in the cart
  const [cartItems, setCartItems] = useState([] as CartItemType[]);  //set the type to an empty array of type CartItemType[]

  //Query key which is 'products' and then provide it with a function 'getProducts'
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
    getProducts);

  console.log(data);

  //this will use an acumulator to iterate through all of the items in the cart and will use the property 'amount' and will give the total amount that is in the cart,  and initilize with 0
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack:number, item) => ack + item.amount,  0);

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  //if something is loading return a little loading thing from materialUI
  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong</div>;

  return (
    <StyledWrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
           <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
       {/* use question mark after 'data' so that it doesn't error if data is undefined*/}
       {data?.map(item => (
         <Grid item key={item.id} xs={12} sm={4}>
           <Item item={item} handleAddToCart={handleAddToCart} />     
         </Grid>
       ))}
     </Grid>
    </StyledWrapper>
  );
}

export default App;
