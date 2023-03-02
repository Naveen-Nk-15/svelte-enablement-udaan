<script>
    import { get } from 'svelte/store'
    import { goto } from '@sapper/app';
    import Button from "./Button.svelte";
    import Calendar from "./Calendar.svelte";
    import Destination from "./Destination.svelte";
    import {cities} from "../stores/Flights.store"
    import {getCities} from "../utils/CitiesHelper";
    import {getResultFlights} from "../utils/FlightFilter.util";
    import {isRoundTrip,fromLocation,toLocation,returnDate,depatureDate} from "../stores/Flights.store";
    export let className;
    export let searchLabel;
    let from = get(fromLocation);
    let to= get(toLocation);
    let oneWayDate= get(depatureDate);
    let roundWayDate= get(returnDate);
    let oneWaySelector = true;
    let cityList = [];
    let cityCode = [];
    let disable = true;
    cities.subscribe( val => {
        cityList = val;
        cityCode = getCities(cityList);
    })
    cityCode = getCities(cityList);
    $: console.log(cityList);
    isRoundTrip.subscribe( val => oneWaySelector = !val )
    $:disable = !(oneWayDate != "" && (!oneWaySelector? roundWayDate != "" : true) && from != "" && to != "");
    const getData = () =>{
        fromLocation.set(from);
        toLocation.set(to);
        depatureDate.set(oneWayDate)
        returnDate.set(roundWayDate)
        if(className == "home")
        goto("/SearchPage")
    }
    const tripSwitch = () =>{
        oneWaySelector = !oneWaySelector;
        isRoundTrip.update(val=> !oneWaySelector)
    }
    const switchLocation = () =>{
        let temp = from;
        from = to;
        to = temp;
    }
</script>

<div class={`wrapper ${className}`}>
    <div class="select">
        <Button className="selected left" on:click={tripSwitch} inverse={oneWaySelector}> {"one - way"} </Button>
        <Button className="selected right" on:click={tripSwitch} inverse={!oneWaySelector}> {"Round trip"} </Button>    
    </div>
    <div class="planner-wrapper">
        <div class="planner">
            <div class="contain">
                <Destination bind:selected={from} label={"From"} locations={cityCode}/>
            </div>
            <div class="swap" on:mousedown={switchLocation}>
                <ion-icon name="swap-horizontal-outline"></ion-icon>
            </div>
            <div class="contain">
                <Destination bind:selected={to} label={"Destination"} locations={cityCode}/>    
            </div>
            <div class="contain">
                <Calendar bind:date={oneWayDate} label={"Departure"} />    
            </div>
            <div class="contain">
                <Calendar bind:date={roundWayDate} label={"Return"} disable={oneWaySelector}/>            
            </div>
        </div>    
        <div class="button">
            <Button className="search" on:click={getData} disable={disable}> {searchLabel} </Button>
        </div>
    </div>
    
</div>

<style lang="scss">
    .wrapper{
        width: 60%;
        display: flex;
        flex-direction: column;
        .select{
            display: flex;
        }
        .planner{
            position: relative;
            margin-top: 2.5rem;
            display: flex;
            border-radius: 5px;
            background-color: var(--calendar-bg);
            .swap{
                position: absolute;
                top: 2rem;
                left: 24%;
                background-color: var(--flight-card-book-bg);
                border-radius: 50%;
                width: 1.5rem;
                height: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
                cursor: pointer;
                ion-icon{
                    color: var(--flight-card-book-text);
                }
            }
            .contain{
                position: relative;
                width: calc(100% / 4);
            }
            .contain:after {
                content: "";
                position: absolute;
                background: #E0E0E0;
                z-index: 1;
                width: 1px;
                height: 5rem;
                top: 50%;
                transform: translateY(-50%);
            }
            .contain:last-child::after{
                display: none;
            }
        }
        .button{
            margin-top: 2.5rem;
            text-align: right;
        }
    }
    .wrapper.home{
        position: absolute;
        top: 50%;
        left: 10%;
    }
    .wrapper.search{
        width: auto;
        padding: 4rem 2rem;
        background-color: var(--search-planner-bg);
        .swap{
            left: 23.6%;
        }
        .planner-wrapper{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 80%;
        }
        .button{
            text-align: right;
        }
    }
</style>