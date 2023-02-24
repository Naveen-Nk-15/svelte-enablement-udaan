<script>
    import Button from "./Button.svelte";
    import {findDuration, findTime} from "../utils/TimeConverter";
    import {CONSTANTS} from "../constants/constants";
    import ConfirmModal from "./ConfirmModal.svelte";
    export let flightName;
    export let flightIcon;
    export let departureLocationCode;
    export let departureLocation;
    export let departureTime;
    export let arrivalLocationCode;
    export let arrivalLocation;
    export let arrivalTime;
    export let price;
    let modalPopup = false;
    let duration = findDuration(departureTime,arrivalTime);
    const toggleModal = () => {
        modalPopup = !modalPopup;
    }
</script>

<tr>
    <td class="departure">
        <div class="flight-info">
            <img src={flightIcon} alt="">
            <div class="flight-name">{flightName}</div>
        </div>
        <div class="departure-code">{departureLocationCode}, {departureLocation}</div>
        <div>{findTime(departureTime)}</div>
    </td>
    <td class="duration">
        <div>{duration}</div>
    </td>
    <td class="arrival">
        <div class="arrival-code">{arrivalLocationCode}, {arrivalLocation}</div>
        <div>{findTime(arrivalTime)}</div>
    </td>
    <td class="price">
        <div>₹{price}</div>
    </td>
    <td class="book">
        <Button className={"flight-card"} on:click={toggleModal}>{CONSTANTS.FLIGHT_CARD.BOOK}</Button>
    </td>
</tr>
{#if modalPopup}
    <ConfirmModal airlines={flightName} flightIcon={flightIcon} on:closeModal={toggleModal}/>
{/if}
<style lang="scss">
    tr{
        display: flex;
        align-items: center;
        margin-top: 1rem;
        background-color: var(--flight-card-bg);
        padding: 1rem;
        .departure,
        .duration,
        .price,
        .book{
            width: 15%;
        }
        .arrival{
            width: 40%; 
        }
        .departure{
            .flight-info{
                display: flex;
                align-items: center;
                img{
                    height: 2rem;
                    width: 2rem;
                }
                .flight-name{
                    margin: 0 0 0 1rem;
                }
            }
            .departure-code{
                color: #727171;
            }
        }
        .duration,
        .arrival{
            padding: 2rem 0 0 0;
        }
        .arrival{
            .arrival-code{
                color: #727171;
            }
        }
        .price{
            font-weight: 700;
        }
        
    }
    
</style>