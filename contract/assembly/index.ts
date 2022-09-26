import { Dish, DishItem } from "./models/dish";
import { Restaurant, RestaurantItem } from "./models/restaurant";
import { Order } from './models/order';

// Restaurants
// Call methods
export function addRestaurant(restaurant: RestaurantItem): void {
    Restaurant.add(restaurant);
}

// View methods
export function getRestaurants(): Restaurant[] {
    return Restaurant.getAll();
}

// Dishes
// Call methods
export function addDish(dish: DishItem): void {
    Dish.add(dish);
}

export function getDishes(): Dish[] {
    return Dish.getAll();
}

export function getDish(id: string): Dish | null {
    return Dish.getOne(id);
}

export function deleteDish(id: string): void {
    Dish.delete(id);
}

// Orders
export function getOrders(): Order[] {
    return Order.getAll();
}