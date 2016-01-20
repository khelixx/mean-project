
db.usermodels.insert({"_id":"569f63b002b63a601626293a","email":"guillaume@gmail.com","passwd":"root","__v":12,
	"settings":{"phone":"07 85 57 47 44","firstname":"guillaume","name":"verdugo"},"groups":[{"name":"first group","persons":
	["Guillaume","Antoine","Raphael"],"bill":[{"date":1453286619773,"description":"first bill","price":400,
	"owed":[{"money":100,"person":"Guillaume"},{"money":100,"person":"Antoine"},{"money":100,"person":"Raphael"},{"money":100,"person":"you"}],"owe":"Raphael"},
	{"date":1453286638211,"description":"third bill","price":100,"owed":[{"money":25,"person":"Guillaume"},{"money":25,"person":"Antoine"},{"money":25,"person":"Raphael"},
	{"money":25,"person":"you"}],"owe":"you"}],"actuality":[{"action":"group","date":1453286570092,"group":"first group"},{"group":"first group","date":1453286619773,
	"bill":"first bill","action":"bill"},{"group":"first group","date":1453286638211,"bill":"third bill","action":"bill"}]},{"actuality":[{"group":"second group",
	"date":1453286602215,"action":"group"},{"group":"second group","date":1453286628493,"bill":"second bill","action":"bill"}],"bill":[{"date":1453286628493,
	"description":"second bill","price":252,"owed":[{"money":84,"person":"Herve"},{"money":84,"person":"Hubert"},{"money":84,"person":"you"}],"owe":"you"}],
	"persons":["Herve","Hubert"],"name":"second group"}]});
