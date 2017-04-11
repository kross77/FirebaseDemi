//http://stackoverflow.com/questions/17483057/convert-url-to-json
export default function getUrlVars(url) {
	let hash;
	let myJson = {};
	let hashes = url.slice(url.indexOf('?') + 1).split('&');
	for (let i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		myJson[hash[0]] = hash[1];
	}
	return myJson;
}
