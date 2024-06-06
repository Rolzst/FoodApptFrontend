import { useParams} from 'react-router-dom';
import { useGetRestaurantById } from '../api/RestaurantApi';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import RestaurantInfo from '@/components/RestaurantInfo';
import MenuItemCard from '@/components/MenuItemCard';
import { useState } from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import OrderSummary from '@/components/OrderSummary';
import { MenuItem } from '@/types';
import CheckOutButton from '@/components/CheckOutButton';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
export default function DetailPage() {
    const { restaurantId } = useParams();
    const { restaurant, isLoading} = useGetRestaurantById(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
        const storedCartItems = sessionStorage.getItem('cartItems-'+restaurantId);
        return storedCartItems ? JSON.parse(storedCartItems):[]
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems: CartItem[]) =>{
            //1. verificar si el item ya se encuentra en carrito
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id);

            //2. si ya se encuentr, actualizar la cantidad en 1
            let updateCartItems;
            if(existingCartItem){
                updateCartItems = prevCartItems.map((cartItem) => 
                    cartItem._id === menuItem._id
                   ? {...cartItem, quantity: cartItem.quantity + 1}:
                   cartItem
                );
            }else{
            //3. si no se encuentra, se agrega a carrito
                updateCartItems = [
                   ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }//fin del else

            //Guardamos el carrito de compras en local storage
            sessionStorage.setItem(
                'cartItems-' + restaurantId, JSON.stringify(updateCartItems)
            )

            return updateCartItems;
        })
    } //Fin de addToCart

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems)=>{
            const updateCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            //Actualizamos el carrito de compras en local storage
            sessionStorage.setItem(
                'cartItems-' + restaurantId, JSON.stringify(updateCartItems)
            )	

            return updateCartItems;
        })
    };//Fin de removeFromCert

    const onCheckOut = (userFormData: UserFormData) => {
        console.log("UserFormData", userFormData);
    }; //Fin del onCheckOut

    if(isLoading || !restaurant) {
        return "Loading..."
    }
  return (

    <div className='flex flex-col gap-10'>
        <AspectRatio ratio = {16/5}>
            <img 
                src={restaurant.imageUrl} 
                className='rounded-md object-cover h-full w-full'
            />
        </AspectRatio>

        <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
            <div className='flex flex-col gap-4'>
                <RestaurantInfo restaurant={restaurant}/>
                <span className='text-2x font-bold traking-tight'>Menu</span>
                {
                    restaurant.menuItems.map((menuItem, key)=>(
                        <MenuItemCard menuItem = {menuItem} key={key}
                            addToCart = {() => addToCart(menuItem)}
                        />
                    ))
                }
            </div>

            <div>
                <Card>
                    <OrderSummary 
                        restaurant={restaurant}
                        cartItems = {cartItems}
                        removeFromCart ={removeFromCart}
                    />
                    <CardFooter>
                        <CheckOutButton
                            disabled={cartItems.length === 0}
                            onCheckOut = {onCheckOut}                        
                        />
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
    
  )
}
