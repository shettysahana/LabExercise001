
import {  useCallback, useEffect, useState } from 'react';
import { type ItemTypes } from '../model/inventoryData.ts';
import {useInventory} from '../hooks/useInventory.ts';

export default function InventoryItems()
{
    const [
        HandleAddmoreItems,
        HandleDelete,
        HandleSave,
        setItemsDetails,
        itemsDetails,
        setcountCategoryItems,
        setcountTotalItems,
        countTotalItems,
        countCategoryItems,
        setItemDeleted,
        itemDeleted,
        itemUndo,
        setItemUndo,
        handleUndoDelete

    ] = useInventory();
   
   
    return(
        <div>
            Inventory details ({countTotalItems})
            <table>
                <tbody>
                    {Object.entries(itemsDetails).map(([category, items]) => {

                        let catItemsCount: number = 0;
                        
                        //setcountCategoryItems(prev => ({
                        //    ...prev,
                        //    catItemsCount: prev[category as ItemTypes]  
                        //}));
                           
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
                                            <button onClick={() => HandleDelete(category as ItemTypes, item)}>Delete</button>
                                            <button onClick={() => HandleSave(item)}>Save</button>
                                        </li>
                                       )
                                        :
                                        (
                                        <li key={item.name}>
                                        <input type='text' defaultValue={item.name}/>
                                         - $ <input type='text' defaultValue={item.price} />
                                            <button onClick={() => HandleDelete(category as ItemTypes, item)}>Delete</button>
                                            <button onClick={() => HandleSave(item)}>Save</button>
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

            {itemDeleted && (
                <div>
                    <p>Item deleted: {itemDeleted.name}</p>
                    <button onClick={() => handleUndoDelete()}>Undo</button>
                </div>
            )}
        </div>
    )
}




