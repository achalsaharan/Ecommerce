export function isPresentInArray(arr, item) {
	let duplicate = false;

	arr.forEach((itr) => {
		if (itr.id === item.id) {
			duplicate = true;
		}
	});

	return duplicate;
}
