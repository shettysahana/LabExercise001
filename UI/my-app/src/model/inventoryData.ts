export type ItemTypes = "Grocercy" | "Electronics";
export type SourceTypes = "Screen" | "Backend";


export interface Itemdetails {
    name: string,
    price: number,
    source?: SourceTypes
}



export const getItemsDetails = (): Record<ItemTypes, Itemdetails[]> => {
    const objInventoryItemsData: Record<ItemTypes, Itemdetails[]> = {
        "Grocercy": [{ "name": "Milk", "price": 2.5, "source": "Backend" },
        { "name": "Bread", "price": 1.5, "source": "Backend" }
        ],
        "Electronics": [{ "name": "Laptop", "price": 1000, "source": "Backend" },
        { "name": "Smartphone", "price": 500, "source": "Backend" }]
    }

    return objInventoryItemsData;
}


