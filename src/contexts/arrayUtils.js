export function isPresentInArray(arr, item) {
    let duplicate = false;

    arr.forEach((itr) => {
        if (itr.productId === item.productId) {
            duplicate = true;
        }
    });

    return duplicate;
}
