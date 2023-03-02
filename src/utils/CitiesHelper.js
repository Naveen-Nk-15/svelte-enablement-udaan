export const getCities = (cities) =>{
    let data = []
    console.log(data + "in helper");
    if(cities.length==0)
        return [];
    for(let i of cities)
    {
        data.push(i.IATA_code+"("+i.city_name+")");
    }
    return data;
}