import { v4 } from'uuid';

class Cart {
    constructor() {
        this.timestamp = Date.now();
        this.products = [];
    }
}

export default Cart;