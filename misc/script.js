
db.usermodels.insert({"_id":"56a1ef19745244402acb2061","email":"guillaume@gmail.com","passwd":"root","__v":29,"settings":{"phone":"07 85 57 47 44",
	"firstname":"guillaume","name":"verdugo"},"groups":[{"name":"no_group","bill":[{"owe":"you","owed":[{"person":"guillaume","money":50},
	{"person":"you","money":50}],"price":100,"description":"first_indivi","date":1453453681632},{"owe":"you","owed":[{"person":"hubert","money":12.5},
	{"person":"you","money":12.5}],"price":25,"description":"second_indivi","date":1453453696446}],"actuality":[{"action":"individual_bill","bill":"first_indivi","date":1453453681632,
	"friend":"guillaume"},{"action":"individual_bill","bill":"second_indivi","date":1453453696446,"friend":"hubert"}]},{"actuality":[{"group":"first group","date":1453453419879,
	"action":"group"},{"group":"first group","date":1453453443279,"bill":"first bill","action":"bill"},{"group":"first group","date":1453453450613,"bill":"second bill","action":"bill"},
	{"group":"first group","date":1453453730894,"bill":"second bill","action":"update"}],"bill":[{"comm":[{"comment":"first comm"}],"date":1453453443279,"description":"first bill",
	"price":200,"owed":[{"money":66.66666666666667,"person":"guillaume"},{"money":66.66666666666667,"person":"raphael"},{"money":66.66666666666667,"person":"you"}],"owe":"antoine"},
	{"date":1453453730894,"description":"second bill","price":100,"owed":[{"money":33.333333333333336,"person":"guillaume"},{"money":33.333333333333336,"person":"raphael"},
	{"money":33.333333333333336,"person":"you"}],"owe":"you"}],"persons":["guillaume","antoine","raphael"],"name":"first group"},{"actuality":[{"group":"second group","date":1453453428063,
	"action":"group"},{"group":"second group","date":1453453468300,"bill":"third_bill","action":"bill"}],"bill":[{"date":1453453468300,
	"description":"third_bill","price":100,"owed":[{"money":33.333333333333336,"person":"herve"},{"money":33.333333333333336,"person":"hubert"},
	{"money":33.333333333333336,"person":"you"}],"owe":"you"}],"persons":["herve","hubert"],"name":"second group"}]},
	{"_id":"56a115e32e0990f0239d96af","email":"guillaume@gmail.com","passwd":"root","__v":14,"settings":{"phone":"07 85 57 47 44","firstname":"verdugo","name":"guillaume"},
	"groups":[{"name":"no_group","bill":[{"owe":"you","owed":[{"person":"Guillaume","money":50},{"person":"you","money":50}],"price":100,"description":"first individual_bill",
	"date":1453397822806}],"actuality":[{"action":"individual_bill","bill":"first individual_bill","date":1453397822806,"friend":"Guillaume"}]},
	{"name":"first group","persons":["Guillaume","Antoine","Raphael"],"bill":[{"owe":"you","owed":[{"person":"Guillaume","money":62.5},
	{"person":"Antoine","money":62.5},{"person":"Raphael","money":62.5},{"person":"you","money":62.5}],"price":250,"description":"first bill","date":1453397712355},{"owe":"Antoine",
	"owed":[{"person":"Raphael","money":125},{"person":"you","money":125}],"price":250,"description":"second group","date":1453397770876}],
	"actuality":[{"action":"group","date":1453397665266,"group":"first group"},{"action":"bill","bill":"first bill","date":1453397712355,"group":"first group"},{"action":"bill",
	"bill":"second group","date":1453397748464,"group":"first group"},{"action":"update","bill":"second group","date":1453397770876,"group":"first group"}]},{"name":"second group",
	"persons":["Hubert","Herve"],"bill":[{"owe":"you","owed":[{"person":"Hubert","money":200},{"person":"Herve","money":200},{"person":"you","money":200}],
	"price":600,"description":"third bill","date":1453397797376}],"actuality":[{"action":"group","date":1453397691832,"group":"second group"},
	{"action":"bill","bill":"third bill","date":1453397797376,"group":"second group"}]}]});
