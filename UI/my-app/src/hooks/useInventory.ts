

import {  useCallback, useEffect, useState } from 'react';
import { getItemsDetails, type ItemTypes } from '../model/inventoryData.ts';
import type { Itemdetails } from '../model/inventoryData.ts';

export function useInventory()
{
     // use lazy intializer to call function
     const [itemsDetails, setItemsDetails] = useState<Record<ItemTypes, Itemdetails[]>>(() => getItemsDetails());
     const [countTotalItems, setcountTotalItems] = useState<number>(0);
     const [countCategoryItems, setcountCategoryItems] = useState<Record<ItemTypes, number>>(null);
 
     const HandleAddmoreItems = useCallback((category: ItemTypes) => {
         // Logic to add more items to the specified category
         const newItem: Itemdetails = { name: "New Item", price: 0, source: "Screen" }; // Example new item
         setItemsDetails(prevDetails => ({
             ...prevDetails,
             [category]: [...prevDetails[category], newItem]
         }));
     },[]);
 
     const handleDelete = useCallback((category: ItemTypes, item: Itemdetails) => {
         // Logic to delete the specified item
         setItemsDetails(prevDetails => ({
             ...prevDetails,
                 [category]: prevDetails[category].filter(i => i.name !== item.name)
         }));
     },[]);
 
     const handleSave = useCallback((item: Itemdetails) => {
         // Logic to save the changes made to the items
         // This could involve sending the updated itemsDetails to a backend server
         console.log("Saving  changes:", item);
     },[]);
 
     const handleCountCategoryItems = useCallback(() => {
 
     const TotalItems = (Object.keys(itemsDetails) as ItemTypes[]).reduce((acc,category) => {
         acc[category] = itemsDetails[category].length;
         return acc;
         },{} as Record<ItemTypes, number>);
         setcountCategoryItems(TotalItems);
     
     const AllitemsCount = Object.values(TotalItems).reduce((acc, count) => acc + count,0);
     setcountTotalItems(AllitemsCount);
     },[itemsDetails]);
 
    return {
        HandleAddmoreItems,
        handleDelete,
        handleSave,
        setItemsDetails,
        itemsDetails,
        setcountCategoryItems,
        setcountTotalItems,
        countTotalItems,
        countCategoryItems
    }
}