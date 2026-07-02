

import { useCallback, useEffect, useState } from 'react';
import { getItemsDetails, type ItemTypes } from '../model/inventoryData.ts';
import type { Deleteditem, Itemdetails } from '../model/inventoryData.ts';

export function useInventory() {
    // use lazy intializer to call function
    const [itemsDetails, setItemsDetails] = useState<Record<ItemTypes, Itemdetails[]>>(() => getItemsDetails());
    const [countTotalItems, setcountTotalItems] = useState<number>(0);
    //const [countCategoryItems, setcountCategoryItems] = useState<Record<ItemTypes, number>>(null);
    const [itemDeleted, setItemDeleted] = useState<Deleteditem>(null);
    //const [itemUndo, setItemUndo] = useState<boolean>(false);

    const HandleDelete = useCallback((category: ItemTypes, item: Itemdetails) => {
        // Logic to delete the specified item
        setItemsDetails(prevDetails => {
            const rows = prevDetails[category].filter(i => i.name === item.name);
            setItemDeleted(rows.length > 0 ? {category , item: rows[0]} : null);
            return {
                ...prevDetails,
                [category]: prevDetails[category].filter(i => i.name !== item.name)
            };
        })
    }, []);

    const HandleSave = useCallback((category, item: Itemdetails) => {
        // Logic to save the changes made to the items
        // This could involve sending the updated itemsDetails to a backend server
        item.source = "Backend";
         setItemsDetails(prev => {
            return {
                ...prev,
                [category]: [...prev[category] ,item ]
            }
        })
        console.log("Saving  changes:", item);
    }, []);

    const handleCountCategoryItems = useCallback(() => {
        setItemsDetails(prev => {
        let count = 0;
       for(const kcat in prev)
       {
        count = count + prev[kcat].length;
       }
       setcountTotalItems(count);
       return prev;
        });

    }, []);

    const HandleUndoDelete = useCallback(() => {
        if (itemDeleted) {
            setItemsDetails(prevDetails => ({
                ...prevDetails,
                [itemDeleted.category]: [...prevDetails[itemDeleted.category], itemDeleted.item]
            }));
            setItemDeleted(null);
        }
    }, [itemDeleted]);

    const HandleAddmoreItems = useCallback((category: ItemTypes) => {
        // Logic to add more items to the specified category
        const newItem: Itemdetails = { name: "New Item", price: 0, source: "Screen" }; // Example new item
        setItemsDetails(prevDetails => ({
            ...prevDetails,
            [category]: [...prevDetails[category], newItem]
        }));
        
    }, []);

    useEffect(() => {
        handleCountCategoryItems();
    },[itemsDetails]);

    return {
        HandleAddmoreItems,
        HandleDelete,
        HandleSave,
        itemsDetails,
        countTotalItems,
        itemDeleted,
        HandleUndoDelete
    }
}