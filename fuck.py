import csv,json
g = []
with open('emotelist.csv') as h:
	rer = csv.DictReader(h,fieldnames=['name','image'])
	for r in rer:
		g.append(r)
print json.dumps(g)
