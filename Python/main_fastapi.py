from fastapi import FastAPI , Path , Query, HttpException , Status

app = FastAPI()

class Item:
	name: str
	price: float

//create endpoints
@app.get("/get-user/{userid}")
def get_user(userid: int, extra: str = None):
	userdata = {
		"user_id": userid,
		"name": "John Doe",
		"email": ""
	}
		if extra:
		userdata["extra"] = extra
	return userdata

@app.get("/")
def home():
	return {"message": "Hello, World!"}

#dictionary to store items
inventory ={
	1: {"name": "Item 1", "price": 10.99},
	2: {"name": "Item 2", "price": 5.49},
	3: {"name": "Item 3", "price": 20.00}
}


@app.get("/get-item/{item_id}")
def get_item(item_id: int = Path(..., description="ID should be greater than 0")):
	item = inventory.get(item_id)
	item1 = inventory[item_id]
	if item:
		return item
	return {"error": "Item not found"}

#here name is path parameter and price is query parameter
@app.get("/get-item-by-name/{name}?price={price}")
def get_item_byname(name: str = Query(None, title="Name",description="Name of the item"),price:float= None):
	for item in inventory.values():
		if item["name"] == name or item["price"] == price:
			return item
	return {"error": "Item not found"}

@app.post("/create-item")
def create_item(item: Item):
	new_id = max(inventory.keys()) + 1
	inventory[new_id] = {"name": item.name, "price": item.price}
	return inventory[new_id]

# here item_id is path parameter and item is request body
@app.put("/update-item/{item_id}")
def update_item(item_id: int, item: Item):
	if item_id in inventory:
		inventory[item_id] = {"name": item.name, "price": item.price}
		return inventory[item_id]
	#return {"error": "Item not found"}
	raise HttpException(status_code=Status.HTTP_404_NOT_FOUND, detail="Item not found")

@app.delete("/delete-item/{item_id}")
def delete_item(item_id:int= Query(...,description="ID of the item to delete")):
	if item_id in inventory:
		deleted_item = inventory.pop(item_id)
		return {"message": "Item deleted", "item": deleted_item}
	return {"error": "Item not found"}