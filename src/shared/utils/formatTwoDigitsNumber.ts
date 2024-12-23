function formatTwoDigitsNumber(number: number): string {
    let twoDigitsNumber: string = number.toString();

    if( number >= 0 && number <= 9) {
        twoDigitsNumber =  "0" + number;
    }

    return twoDigitsNumber;
}

export default formatTwoDigitsNumber;