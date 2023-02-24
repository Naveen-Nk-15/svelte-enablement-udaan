<script>
    import {CONSTANTS} from "../constants/constants"
    import { createEventDispatcher } from 'svelte';
    export let active = false;
    export let results;
    const dispatch = createEventDispatcher();
    const caller = () => {
        dispatch("trigger");    
    }
</script>

<div class="title"></div>
<div class="filter-container">
    {#each CONSTANTS.TIME_FILTER.OPTIONS as time, i(time.ID)}
        <div class="contain">
            <label>
                <input  type="checkbox" bind:group={results} value={time.VALUE} on:change disabled={active}  ><div>{time.LABEL}</div>
            </label>
        </div>    
    {/each}
</div>

<style lang="scss">
    .title{
        font-weight: 500;
        margin: 1rem;
    }
    .filter-container{
        display: flex;
        flex-wrap: wrap;
        .contain{
            margin: 0.5rem;
            width: calc((100% - 32px) / 2);
            label{
                cursor: pointer;
                input{
                    display: none;
                }
                div{    
                    background-color: var(--time-filter-bg);
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.5rem 1.5rem;
                }
                input:checked + div{
                    background-color: var(--flight-card-book-bg);
                    color: var(--flight-card-book-text);
                }
                input:disabled + div{
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }
        }
    }
    
</style>