
import {  useEffect, useState } from 'react';
import { getItemsDetails, type ItemTypes } from '../model/inventoryData.ts';
import type { Itemdetails } from '../model/inventoryData.ts';
export default function InventoryItems()
{
    // use lazy intializer to call function
    const [itemsDetails, setItemsDetails] = useState<Record<ItemTypes, Itemdetails[]>>(() => getItemsDetails());
    const [countTotalItems, setcountTotalItems] = useState<number>(() => handleCountAllItems());
    const [countCategoryItems, setcountCategoryItems] = useState<Record<ItemTypes, number>>(() => handleCountCategoryItems());

    const HandleAddmoreItems = (category: ItemTypes) => {
        // Logic to add more items to the specified category
        const newItem: Itemdetails = { name: "New Item", price: 0, source: "Screen" }; // Example new item
        setItemsDetails(prevDetails => ({
            ...prevDetails,
            [category]: [...prevDetails[category], newItem]
        }));
    }

    const handleDelete = (category: ItemTypes, item: Itemdetails) => {
        // Logic to delete the specified item
        setItemsDetails(prevDetails => ({
            ...prevDetails,
                [category]: prevDetails[category].filter(i => i.name !== item.name)
        }));
    }

    const handleSave = (item: Itemdetails) => {
        // Logic to save the changes made to the items
        // This could involve sending the updated itemsDetails to a backend server
        console.log("Saving  changes:", item);
    }

    const handleCountCategoryItems = ():Record<ItemTypes, number> => {

const TotalItems = Object.entries(itemsDetails).reduce((acc,[category, ites]) => {
    acc[category] = ites.length;
    return acc;
},{} as Record<ItemTypes, number>);
return TotalItems;
    }

    const handleCountAllItems = ():number => {

    const AllitemsCount = Object.values(countCategoryItems).reduce((acc, count) => acc + count,0);
return AllitemsCount;
    }

    useEffect(() =>
    {
       
    })

    return(
        <div>
            Inventory details ({countTotalItems})
            <table>
                <tbody>
                    {Object.entries(itemsDetails).map(([category, items]) => (
                       const catItemsCount: number = countCategoryItems[category];
                        <tr key={category}>
                            <td valign='top'>{category} {catItemsCount} </td>
                            <td valign='top'>
                                <ul>
                                    {items.map(item => (
                                        item.source === "Backend"
                                        ? 
                                       (<li key={item.name}>
                                            {item.name} - ${item.price}
                                            <button onClick={() => handleDelete(category as ItemTypes, item)}>Delete</button>
                                            <button onClick={() => handleSave(item)}>Save</button>
                                        </li>
                                       
                                       )
                                        :
                                        (
                                        <li key={item.name}>
                                        <input type='text' defaultValue={item.name}/>
                                         - $ <input type='text' defaultValue={item.price} />
                                            <button onClick={() => handleDelete(category as ItemTypes, item)}>Delete</button>
                                            <button onClick={() => handleSave(item)}>Save</button>
                                        </li>
                                        )
                                    ))}
                                </ul>
                                <button onClick={() => HandleAddmoreItems(category as ItemTypes)}>Add More Items</button>       
                            </td>   
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}




