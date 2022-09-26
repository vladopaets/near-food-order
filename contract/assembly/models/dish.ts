import { PersistentUnorderedMap, context, u128, logging } from 'near-sdk-as';
import { Restaurant } from './restaurant';
import { ADMIN_WALLET } from '../constants';
import { toYocto } from '../utils';

export const dishes = new PersistentUnorderedMap<string, Dish>('DISHES');

@nearBindgen
export class DishItem {
    id: string;
    restaurantId: string;
    name: string;
    image: string;
    price: u128;
    ingredients: string[];
    available: boolean;
}

@nearBindgen
export class Dish {
    id: string;
    restaurantId: string;
    name: string;
    image: string;
    price: u128;
    ingredients: string[];
    available: boolean;
    addedBy: string;

    constructor(item: DishItem, addedBy: string) {
        this.id = item.id;
        this.restaurantId = item.restaurantId;
        this.name = item.name;
        this.image = item.image;
        this.price = toYocto(item.price);
        this.ingredients = item.ingredients;
        this.available = item.available;
        this.addedBy = addedBy;
    }

    public static getOne(id: string): Dish | null {
        return dishes.get(id);
    }

    public static getAll(): Dish[] {
        return dishes.values();
    }

    public static delete(id: string): void {
        dishes.delete(id);
    }

    public static add(payload: DishItem): void {
        const existingDish = this.getOne(payload.id);

        logging.log(`Getting existing dish ${payload.id}`);

        assert(existingDish == null, `${payload.name} already exists`);
        
        const restaurant = Restaurant.getOne(payload.restaurantId);

        if (restaurant) {
            logging.log(`Getting choosen restaurant ${restaurant.name}`);
        }

        assert(restaurant != null, 'Restaurant was not added yet');
        assert(context.sender == ADMIN_WALLET, 'You are not allowed to add new restaurant');

        const dish = new Dish(payload, context.sender);

        dishes.set(payload.id, dish);
    }
}
