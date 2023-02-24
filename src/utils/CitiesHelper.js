export const getCities = (cities) =>{
    let data = []
    if(cities.length == 0)
        return [];
    for(let i of cities)
    {
        data.push(i.IATA_code+"("+i.city_name+")");
    }
    return data;
}