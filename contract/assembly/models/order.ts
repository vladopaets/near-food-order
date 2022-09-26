import { PersistentUnorderedMap, context } from "near-sdk-as";

export const orders = new PersistentUnorderedMap<string, Order>('ORDERS');

const enum OrderStatus {
    NEW = 0,
    EXPIRED = 1,
    PROCESSING = 2,
    FINISHED = 3,
}

@nearBindgen
export class OrderItem {
    id: string;
    createdBy: string;
    restaurantId: string;
    dishesId: string[];
}

@nearBindgen
export class Order {
    id: string;
    createdBy: string;
    expireAt: u32;
    restaurantId: string;
    status: OrderStatus;

    constructor(item: OrderItem) {
        this.id = item.id;
        this.createdBy = item.createdBy;
        this.restaurantId = item.restaurantId;
        this.expireAt = new Date(Date.now()).getTime() + 900000;
        this.status = OrderStatus.NEW;
    }

    public static getOne(id: string): Order | null {
        return orders.get(id);
    }

    public static getAll(): Order[] {
        return orders.values();
    }

    public static create(payload: OrderItem): void {
   
    }

    public static attachDishToOrder(): void {

    }

    public static makeOrder(): void {

    }
}
