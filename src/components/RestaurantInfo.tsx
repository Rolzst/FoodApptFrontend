import { Dot } from 'lucide-react';
import {Restaurant} from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
type Props = {
    restaurant: Restaurant;
}
export default function RestaurantInfo({restaurant}: Props) {
  return (
    <Card className="border-sla">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tighter text-orange-500">
                {restaurant.restauranteName}
            </CardTitle>
            <CardDescription>
                {restaurant.city},{restaurant.country}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex">
            {
                restaurant.cuisines.map((item,index)=>(
                  <span className="flex" key={index}>
                    <span>{item}</span>
                    {index < restaurant.cuisines.length - 1 && <Dot />}
                  </span>  
                  
                ))}
        </CardContent>
    </Card>
  )
}