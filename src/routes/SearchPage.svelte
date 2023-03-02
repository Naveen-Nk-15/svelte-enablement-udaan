<script context="module">
    export function preload(){
		return this.fetch("http://localhost:3001/flights")
		.then(response => response.json())
		.then(data => {
			console.log("server side rendering starts");
			return {flightData : data};
		}).catch(error => {
			console.log(error);
			return [];
		});
	}
</script>


<script>
    import { get } from 'svelte/store'
    import { onMount } from "svelte";
    import { cities, availableFlights } from "../stores/Flights.store";
    import FlightTable from "../components/FlightTable.svelte";
    import TimeFilter from "../components/TimeFilter.svelte";
    import FlightPlanner from "../components/FlightPlanner.svelte";
    import FlightFilter from "../components/FlightFilter.svelte";
    import {oneWayTimeFilter, roundWayTimeFilter, priceRange, flightCompanies} from "../stores/Filters.store";
    import Chart from '../components/Chart.svelte';
    import Header from '../components/Header.svelte';
    import {CONSTANTS} from "../constants/constants";
    import Button from '../components/Button.svelte';
    import OfferModal from '../components/OfferModal.svelte';
    import { getResultFlights } from '../utils/FlightFilter.util';
    import {isRoundTrip,fromLocation,toLocation,returnDate,depatureDate} from "../stores/Flights.store";
    import Slider from "../components/Slider.svelte";
    export let flightData;
    let oneWay = []
    let roundWay = []
    let priceRanges = []
    let flightCompaniesNames;
    let offerPopup = false;
    
    onMount(()=>{
        availableFlights.set(flightData.flights);
        console.log(get(availableFlights));
        getResultFlights(get(depatureDate),get(returnDate),get(fromLocation),get(toLocation),!get(isRoundTrip));
    })
    
    const closeOffer = () =>{
        offerPopup = !offerPopup;
    }
    setTimeout(closeOffer, 3000)
    // getting filter values from the stores
    oneWayTimeFilter.subscribe( val=> {
        oneWay = val;
    } )
    roundWayTimeFilter.subscribe( val=> {
        roundWay = val;
    } )
    priceRange.subscribe( val=> {
        priceRanges = val;
    } )
    flightCompanies.subscribe( val=> {
        flightCompaniesNames = val;
    } )
    let disable = false;
    isRoundTrip.subscribe( val => disable =!val)

    // updating the filter values to the stores
    const updateOneWayTimeFilter = () => {
        oneWayTimeFilter.update(value => oneWay);
    }
    const updateRoundWayTimeFilter = () => {
        roundWayTimeFilter.update(value => roundWay);
    }
    const updatePriceRanges = () => {
        priceRange.update(value=> priceRanges);
    }
    const updateFlightCompanies = () => {
        flightCompanies.update((val)=>{
            val=flightCompaniesNames;
            return val;
        });
    }

    // resetting the values to initial
    const reset = () =>{
        oneWayTimeFilter.set([]);
        roundWayTimeFilter.set([]);
        priceRange.set([1000,20000]);
        getResultFlights();
    }
</script>

<div>
    <Header/>
    <div class="planner">
        <FlightPlanner className="search" searchLabel="update search"/>
    </div>
    <div class="wrapper">
        <div class="left">
            <div class="filter-header">
                <div class="heading">
                    {CONSTANTS.FILTER.HEADING}
                </div>
                <div class="reset">
                    <Button className="reset" on:click={reset}>{CONSTANTS.FILTER.RESET}</Button>
                </div>
            </div>
            <div class="departure">
                <div class="heading">{CONSTANTS.FILTER.DEPARTURE}</div>
                <TimeFilter bind:results={oneWay}  on:change={updateOneWayTimeFilter}/>
            </div>
            <div class="return">
                <div class="heading">{CONSTANTS.FILTER.RETURN}</div>
                <TimeFilter bind:results={roundWay} on:change={updateRoundWayTimeFilter} active={disable}/>
            </div>
            <div class="return">
                <div class="heading">{CONSTANTS.FILTER.PRICE}</div>
                <Slider {priceRanges}  on:updatePriceRanges/>
            </div>
            <div class="flight-filter">
                <div class="heading">{CONSTANTS.FLIGHT_FILTER.TITLE}</div>
                <FlightFilter  bind:selection={flightCompaniesNames} on:change={updateFlightCompanies}/>
            </div>
            {#if offerPopup}
                <div class="modal">
                    <OfferModal on:close={closeOffer}/>                
                </div>
            {/if}

        </div>
        <div class="right">
            <div class="chart">
                <Chart/>
            </div>
            
            <FlightTable/>
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper{
        display: flex;
        .left{
            width: 23%;
            border-right: 1px solid var(--filter-border);
            padding: 1rem;
            background-color: var(--calendar-bg);
            .filter-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .heading{
                    font-size: 1.2rem;
                    font-weight: 500;
                }
            }
            .departure{
                margin-top: 2rem;
                .heading{
                    font-weight: 500;
                }
            }
            .return{
                margin-top: 2rem;
                .heading{
                    font-weight: 500;
                }
            }
            
            .flight-filter{
                margin-top: 2rem;
                .heading{
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
            }
            .modal{
                transition: all 2s;
            }
        }
        .right{
            width: 77%;
            padding: 1rem 2rem;
        }
    }
    :global(body) {
		background: var(--bg-color);
		color: var(--text-color);
	}
	
	:global(body.dark) {
		--bg-color: #16222b;
		--text-color: #FFFFFF;
		--primary-color: #002237; 
		--calendar-font: #FFFFFF;
		--calendar-bg:#002237;
		--time-filter-bg:#09293C;
		--toggler-inverse-bg:#fff;
		--flight-card-bg:#002237;
		--flight-card-book-bg:#FDFDFD;
		--flight-card-book-text:#09293C;
		--search-planner-bg:#011624;
		--filter-border:#002237;
		--range-progress-bg:#345485;
		--offer-card-bg:#011624;
	}
</style>