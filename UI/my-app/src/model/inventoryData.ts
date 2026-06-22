export type ItemTypes = "Grocercy" | "Electronics";
export type SourceTypes = "Screen" | "Backend";
export interface InventoryData {
    Items: Record<ItemTypes, Itemdetails[]>
}

export interface Itemdetails {
    name: string,
    price: number,
    source?: SourceTypes
}



const getItemsDetails = (): InventoryData => {
    const objInventoryItemsData: InventoryData = {
        "Grocercy": [{ "name": "Milk", "price": 2.5, "source": "Backend" },
        { "name": "Bread", "price": 1.5, "source": "Backend" }
        ],
        "Electronics": [{ "name": "Laptop", "price": 1000, "source": "Backend" },
        { "name": "Smartphone", "price": 500, "source": "Backend" }]
    }

    return objInventoryItemsData;
}


