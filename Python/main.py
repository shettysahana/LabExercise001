
//create a simple flask app with two endpoints
@app.route("/get-user/<int:userid>", methods=["GET"])
#get api request 
#/get-user/123?extra=some_value
def get_user(userid):
 userdata = {
  "user_id": userid,
  "name": "John Doe",
  "email": "abc@gmail.com",
  "age": 30
}
 extra = request.args.get("extra", None)
 if extra:
  userdata["extra"] = extra

  return jsonify(userdata)

@app.route("/create-user", methods=["POST","PUT"])
def create_user():
 if request.method == "POST":
	 data = request.get_json() // Get JSON data from the request body
	 if not data:
	  return jsonify({"error": "Invalid JSON data"}), 400

	 name = data.get("name")
	 email = data.get("email")
	 age = data.get("age")
	 if not name or not email or not age:
	  return jsonify({"error": "Missing required fields"}), 400

	 new_user = {
	  "user_id": 123,  # In a real application, this would be generated dynamically
	  "name": name,
	  "email": email,
	  "age": age
	}
 return jsonify(new_user), 201


if __name__ == "__main__":
	print("Hello, World!");
	app.run(debug=True);