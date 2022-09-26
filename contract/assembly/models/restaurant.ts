import { PersistentUnorderedMap, context, logging } from "near-sdk-as";
import { ADMIN_WALLET } from "../constants";

export const restaurants = new PersistentUnorderedMap<string, Restaurant>('RESTAURANTS');

@nearBindgen
export class RestaurantItem {
    id: string;
    name: string;
    location: string;
}

@nearBindgen
export class Restaurant {
    id: string;
    name: string;
    location: string;
    addeBy: string;
 
    constructor(item: RestaurantItem, addedBy: string) {
        this.id = item.id;
        this.name = item.name;
        this.location = item.location;
        this.addeBy = addedBy;
    }

    public static getOne(id: string): Restaurant | null {
        return restaurants.get(id);
    }

    public static getAll(): Restaurant[] {
        return restaurants.values();
    }

    public static delete(id: string): void {
        restaurants.delete(id);
    }

    public static add(payload: RestaurantItem): void {
        const existingRestaurant = this.getOne(payload.id);
        
        logging.log(`Getting existing restaurant ${payload.id}`);

        assert(existingRestaurant == null, `${payload.name} already exists`)
        assert(context.sender == ADMIN_WALLET, 'You are not allowed to add new restaurant');

        const restaurant = new Restaurant(payload,  context.sender);
        restaurants.set(restaurant.id, restaurant);
    } 
}
