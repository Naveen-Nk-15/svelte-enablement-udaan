<script>
    import { each } from "svelte/internal";
    import Button from "./Button.svelte";
    import FlightCard from "./FlightCard.svelte";
    import { CONSTANTS } from "../constants/constants";
    import { nanoid } from 'nanoid';
    import {isRoundTrip,oneWayFlights,roundTripFlights} from "../stores/Flights.store";
    let depature = true;
    let roundTrip;
    let oneWay = [];
    let returnTrip = [];
    let resultFlights = [];
    let id = nanoid();
    oneWayFlights.subscribe (val => oneWay=val)
    roundTripFlights.subscribe (val => returnTrip=val)
    resultFlights = oneWay;
    isRoundTrip.subscribe( val => roundTrip = val )
    $:depature ? resultFlights = oneWay : resultFlights = returnTrip;
    const tripSwitch = () =>{
      depature = !depature;
    }
</script>

<div>
  {#if roundTrip}
    <div class="select">
      <Button className="selected left" on:click={tripSwitch} inverse={depature}> {"Departure"} </Button>
      <Button className="selected right" on:click={tripSwitch} inverse={!depature}> {"Return"} </Button>    
    </div>
  {/if}
  <table>
    <tr>
      <th class="departure">{CONSTANTS.FLIGHT_TABLE.DEPARTURE}</th>
      <th class="duration">{CONSTANTS.FLIGHT_TABLE.DURATION}</th>
      <th class="arrival">{CONSTANTS.FLIGHT_TABLE.ARRIVAL}</th>
      <th class="price">{CONSTANTS.FLIGHT_TABLE.PRICE}</th>
      <th class="book"></th>
    </tr>
    {#each resultFlights as data,i(nanoid())}
      <FlightCard flightName={data.airlines.name} 
                  flightIcon={data.airlines.logo}
                  departureLocation={data.from.city_name}
                  departureLocationCode={data.from.IATA_code}
                  departureTime={data.departure}
                  arrivalLocationCode={data.to.IATA_code}
                  arrivalLocation={data.to.city_name}
                  arrivalTime={data.arrival}
                  price={data.price}
      />
    {/each}
  </table>
</div>

<style lang="scss">
  .select{
    margin: 2rem 0 1rem;
  }
  table{
    width: 100%;
    tr{
      padding: 1rem;
      display: flex;
      th{
        text-align: left;
      }
      .departure,
      .duration,
      .price,
      .book{
        width: 15%;
      }
      .arrival{
        width: 40%; 
      }
    }
  }
</style>