import { availableFlights } from '../stores/Flights.store';
import { get } from 'svelte/store'
import { oneWayFlights, roundTripFlights } from "../stores/Flights.store";
import {oneWayTimeFilter, roundWayTimeFilter, priceRange, flightCompanies} from "../stores/Filters.store";
let flights;
availableFlights.subscribe( val => flights=val)
const checkFlight = (fromDate,from,to,flight) =>{
    // console.log(new Date(flight.departure).toDateString() + fromDate.toDateString());
    // console.log(new Date(flight.departure).toDateString() == fromDate.toDateString())
    // console.log(flight.from.IATA_code == getCode(from)); 
    // console.log(flight.to.IATA_code == getCode(to));
    // return new Date(flight.departure).toDateString() == fromDate.toDateString() && 
    return flight.from.IATA_code == getCode(from) &&
    flight.to.IATA_code == getCode(to);
}

const getCode = (location) =>{
    return location.substr(0,3);
}

export const getResultFlights = (departure,roundWay,from,to, returnFlag) =>{
    // console.log(departure + roundWay +from+to+returnFlag);
    let fromDate = new Date(departure);
    // console.log(fromDate);
    let returnDate = new Date(roundWay);
    let resultFlightsOneWay = [];
    let resultFlightsReturn = [];
    let min = 999999;
    let max = 0;
    for(let i of flights)
    {
        if(checkFlight(fromDate,getCode(from),getCode(to),i))
        {
            i.price > max ? max = i.price : max;
            i.price < min ? min = i.price : min;
            resultFlightsOneWay.push(i);
        }
        if(!returnFlag && checkFlight(returnDate,getCode(to),getCode(from),i))
        {
            resultFlightsReturn.push(i);
        }
    }
    oneWayTimeFilter.set([]);
    roundWayTimeFilter.set([]);
    min===max?priceRange.set([0,max+100]):priceRange.set([min,max]);
    flightCompanies.set([]);
    oneWayFlights.set(resultFlightsOneWay);
    roundTripFlights.set(resultFlightsReturn);
    // console.log(resultFlightsOneWay);
}

const morning = (resultFlight,isRoundTrip) => {
    let result = [];
    for(let i of resultFlight)
    {
        let flightTime = new Date(i.departure).getTime();
        let checker = new Date(i.departure).setHours(11);
        if(flightTime < checker)
        {
            // console.log("brfore 11");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( value => result) : oneWayFlights.update( value => result);
}

const afternoon = (resultFlight,isRoundTrip) => {
    let result = [];
    for(let i of resultFlight)
    {
        let flightTime = new Date(i.departure).getTime();
        let beginChecker = new Date(i.departure).setHours(11);
        let endChecker = new Date(i.departure).setHours(17);
        if(flightTime > beginChecker && flightTime < endChecker)
        {
            // console.log("11 - 5");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( value => result) : oneWayFlights.update( value => result);
    // console.log(get(oneWayFlights));
}

const evening = (resultFlight,isRoundTrip) => {
    let result = [];
    for(let i of resultFlight)
    {
        let flightTime = new Date(i.departure).getTime();
        let beginChecker = new Date(i.departure).setHours(17);
        let endChecker = new Date(i.departure).setHours(21);
        if(flightTime > beginChecker && flightTime < endChecker)
        {
            console.log("5 - 9");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( value => result) : oneWayFlights.update( value => result);
}

const night = (resultFlight,isRoundTrip) => {
    let result = [];
    for(let i of resultFlight)
    {
        let flightTime = new Date(i.departure).getTime();
        let checker = new Date(i.departure).setHours(21);
        if(flightTime > checker)
        {
            // console.log("11");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( val => result) : oneWayFlights.update( val => result);
}

const priceFilter = (resultFlights,price,isRoundTrip) =>{
    let result = [];
    for(let i of resultFlights)
    {
        if(i.price >= price[0] && i.price <= price[1])
        {
            console.log("in range");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( val => result) : oneWayFlights.update( val => result);
    // console.log(get(oneWayFlights));
}

const flightCompanyFilter = (resultFlights,companyName,isRoundTrip) =>{
    let result = [];
    for(let i of resultFlights)
    {
        // console.log(i.airlines.id,companyName);
        if(companyName.includes(i.airlines.id))
        {
            console.log("in range");
            result.push(i);
        }
    }
    isRoundTrip ? roundTripFlights.update( val => result) : oneWayFlights.update( val => result);
    // console.log(get(oneWayFlights));
}

const mapper = {
    morning : morning,
    afternoon : afternoon,
    evening : evening,
    night : night
}

oneWayTimeFilter.subscribe( value =>{
    let resultFlight = get(oneWayFlights);
    for(let i of value)
    {
        mapper[i](resultFlight,false);
    }
})

roundWayTimeFilter.subscribe( value =>{
    let resultFlight = get(roundTripFlights);
    for(let i of value)
    {
        mapper[i](resultFlight,true);
    }
})

priceRange.subscribe( value =>{
    // console.log("checking companies" + value);
   let oneWayResultFlight = get(oneWayFlights);
   let roundTripResultFlights = get(roundTripFlights);
   priceFilter(oneWayResultFlight,value,false);
   priceFilter(roundTripResultFlights,value,true);
})

flightCompanies.subscribe( value =>{
    // console.log("checking companies" + value);
    let oneWayResultFlight = get(oneWayFlights);
    let roundTripResultFlights = get(roundTripFlights);
    flightCompanyFilter(oneWayResultFlight,value,false);
    flightCompanyFilter(roundTripResultFlights,value,true);
})