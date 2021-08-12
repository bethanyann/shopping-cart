import { useState } from 'react';
import { useQuery } from 'react-query';
//components go here
import Item from'./Item/Item';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//styles
import { StyledWrapper } from './App.styles';
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
//Query key which is 'products' and then provide it with a function 'getProducts'
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
    getProducts);

  console.log(data);

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  //if something is loading return a little loading thing from materialUI
  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong</div>;

  return (
    <div>

     <Grid container spacing={3}>
       {/* use question mark after 'data' so that it doesn't error if data is undefined*/}
       {data?.map(item => (
         <Grid item key={item.id} xs={12} sm={4}>
           <Item item={item} handleAddToCart={handleAddToCart} />     
         </Grid>
       ))}
     </Grid>

   </div>
  );
}

export default App;
