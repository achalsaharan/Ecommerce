export function isPresentInArray(arr, item) {
    let duplicate = false;

    arr.forEach((itr) => {
        if (itr._id === item._id) {
            duplicate = true;
        }
    });

    return duplicate;
}
