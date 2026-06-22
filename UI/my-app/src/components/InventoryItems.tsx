
import { useEffect , useState } from 'react';
import { getItemsDetails, type ItemTypes } from '../model/inventoryData.ts';
import type { Itemdetails } from '../model/inventoryData.ts';
export default function InventoryItems()
{
    // use lazy intializer to call function
    const [itemsDetails, setItemsDetails] = useState<Record<ItemTypes, Itemdetails[]>>(() => getItemsDetails());

    const HandleAddmoreItems = (category: ItemTypes) => {
        // Logic to add more items to the specified category
        const newItem: Itemdetails = { name: "New Item", price: 0 }; // Example new item
        setItemsDetails(prevDetails => ({
            ...prevDetails,
            Items: {
                ...prevDetails.Items,
                [category]: [...prevDetails.Items[category], newItem]
            }
        }));
    }

    const handleDelete = (category: ItemTypes, item: Itemdetails) => {
        // Logic to delete the specified item
        setItemsDetails(prevDetails => ({
            ...prevDetails,
            Items: {
                ...prevDetails.Items,
                [category]: prevDetails.Items[category].filter(i => i.name !== item.name)
            }
        }));
    }

    const handleSave = (item: Itemdetails) => {
        // Logic to save the changes made to the items
        // This could involve sending the updated itemsDetails to a backend server
        console.log("Saving changes:", item);
    }

    useEffect(() => {
       alert("sfsfs");
    });

    return(
        <div>
            Inventory details 
            <table>
                {Object.entries(itemsDetails).map(([category, items]) => (
                    
                        <tr>
                        <th colSpan={2}>{category}
                        {/*<button onClick={() => HandleAddmoreItems(category)}>ADD More </button*/}
                        </th>
                        </tr>
                        {items.map((item, index) => (
                            item.source ? (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                </tr>
                            ) : (
                                    <tr key={index}>
                                        <td>
                                             {/*<button onClick={() => handleDelete(category, item) }></button>*/}
                                            <input type="text" placeholder="Enter name" value={item.name} />
                                        </td>
                                        <td>
                                            <input type="number" placeholder="Enter price" value={item.price} />
                                            <button onClick={() => handleSave(item)}>Save</button>
                                        </td>
                                    </tr>
                            )
                        ))}
                  
                ))}

            </table>
        </div>
    )
}




