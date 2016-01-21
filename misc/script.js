
db.usermodels.insert({"_id":"56a115e32e0990f0239d96af","email":"guillaume@gmail.com","passwd":"root","__v":14,
	"settings":{"phone":"07 85 57 47 44","firstname":"verdugo","name":"guillaume"},
	"groups":[{"actuality":[{"friend":"Guillaume","date":1453397822806,"bill":"first individual_bill","action":"individual_bill"}],
	"bill":[{"date":1453397822806,"description":"first individual_bill","price":100,"owed":[{"money":50,"person":"Guillaume"},
	{"money":50,"person":"you"}],"owe":"you"}],"name":"no_group"},{"actuality":[{"group":"first group","date":1453397665266,"action":"group"},
	{"group":"first group","date":1453397712355,"bill":"first bill","action":"bill"},{"group":"first group","date":1453397748464,"bill":"second group","action":"bill"},
	{"group":"first group","date":1453397770876,"bill":"second group","action":"update"}],"bill":[{"date":1453397712355,"description":"first bill",
	"price":250,"owed":[{"money":62.5,"person":"Guillaume"},{"money":62.5,"person":"Antoine"},{"money":62.5,"person":"Raphael"},{"money":62.5,"person":"you"}],"owe":"you"},
	{"date":1453397770876,"description":"second group","price":250,"owed":[{"money":125,"person":"Raphael"},{"money":125,"person":"you"}],"owe":"Antoine"}],
	"persons":["Guillaume","Antoine","Raphael"],"name":"first group"},{"actuality":[{"group":"second group","date":1453397691832,"action":"group"},
	{"group":"second group","date":1453397797376,"bill":"third bill","action":"bill"}],"bill":[{"date":1453397797376,"description":"third bill",
	"price":600,"owed":[{"money":200,"person":"Hubert"},{"money":200,"person":"Herve"},{"money":200,"person":"you"}],"owe":"you"}],"persons":["Hubert","Herve"],"name":"second group"}]});
