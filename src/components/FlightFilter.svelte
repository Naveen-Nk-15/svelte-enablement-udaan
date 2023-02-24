<script>
    import {CONSTANTS} from "../constants/constants";
    export let selection = [];
</script>

<div>
    {#each CONSTANTS.FLIGHT_FILTER.OPTIONS as flight,i(flight.ID)}
        <label class="input"><input  type="checkbox" bind:group={selection} value={flight.VALUE} on:change/>{flight.LABEL}</label>
    {/each}
</div>

<style lang="scss">
    .input{
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 0 0 0.5rem 0;
        input{
            width: 1.25rem;
            height: 1.25rem;
            margin: 0 0.5rem 0 0;
            cursor: pointer;
        }  
    }
</style>