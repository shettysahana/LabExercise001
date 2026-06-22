
const getItemsDetails= () =>
{
    objInventoryItemsData : InventoryData = {
"Grocercy" : []
    }
}

export default function InventoryItems()
{
    return(
        <div>
            <table>

            </table>
        </div>
    )
}

interface InventoryData
{
 Items : Record<string, Itemdetails[]>
} 

interface Itemdetails
{
    name: string,
    price: number
}


