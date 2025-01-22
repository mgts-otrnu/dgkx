function sortByAddress(array: any[]) {
    const items = [...array].sort((a, b) => {
        return -a.name.localeCompare(b.name);
    });

    return items.sort((a, b) => {
        const houseANum: number = parseInt(a.name.split(",")[1]);
        const houseBNum: number = parseInt(b.name.split(",")[1]);

        return a.name.split(",")[0] === b.name.split(",")[0] &&  houseANum > houseBNum ? 1 : -1;
    });
}

export default sortByAddress;