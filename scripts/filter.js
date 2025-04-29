const a = JSON.parse(process.argv[2])
const b = JSON.parse(process.argv[3])
let c = []

let list = [ "org", "net", "com", "cafe" ]

for (const [addr, props] of Object.entries(a)) {
	const { id, mon } = props
	const monitors = { 
		"DP-2": 0,
		"DP-4": 1,
		"eDP-1": -1
	}

	const obj = {
		id: id.toString(),
		class: b[addr],
		//mon: mon === "DP-2" ? 0 : 1
		mon: monitors[mon]
	}

	// Destroy the NSID.
	if (obj.class?.includes(".")) {
		for (const i of list) {
			if (!obj.class.startsWith(i)) continue;
			obj.class = obj.class.split(".").at(-1)
		}
	}
	c.push(obj)
}

console.log(JSON.stringify(c.sort((a, b) => a.id - b.id)))
