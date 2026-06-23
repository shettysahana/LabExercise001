
import {  useCallback, useEffect, useState } from 'react';
import { type ItemTypes } from '../model/inventoryData.ts';
import {useInventory} from '../hooks/useInventory.ts';

export default function InventoryItems()
{
    const { 
        HandleAddmoreItems,
        handleDelete,
        handleSave,
        setItemsDetails,
        itemsDetails,
        setcountCategoryItems,
        setcountTotalItems,
        countTotalItems,
        countCategoryItems

    } = useInventory();
   
   
    return(
        <div>
            Inventory details ({countTotalItems})
            <table>
                <tbody>
                    {Object.entries(itemsDetails).map(([category, items]) => {

                       let catItemsCount: number = 0;
                       if(countCategoryItems > 0)
                       {
                        setcountCategoryItems(prev => ({
                            ...prev,
                            [category as ItemTypes] : catItemsCount
                        }));
                    }  
                           
                      return( 
                         <tr key={category}>
                            <td valign='top'>{category} {catItemsCount} </td>
                            <td valign='top'>
                                <ul>
                                    {items.map(item => (
                                        item.source === "Backend"
                                        ? 
                                       (
                                       <li key={item.name}>
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
                      )
})}
                </tbody>
            </table>
        </div>
    )
}




