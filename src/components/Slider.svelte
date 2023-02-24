<script>
    import Slider from '@bulatdashiev/svelte-slider';
    import { createEventDispatcher } from "svelte";
    import {CONSTANTS} from '../constants/constants';
    export let priceRanges;
    const dispatch = createEventDispatcher();
    function updatePriceRanges()
    {
        dispatch("updatePriceRanges");
    }
</script>

<div class="range" on:mouseup={updatePriceRanges}>
    <Slider max="20000"  bind:value = {priceRanges} step="100" range order />
    <div class="content">
        <span>{CONSTANTS.FILTER.PRICE_SYMBOL}{priceRanges[0]}</span>
        <span>{CONSTANTS.FILTER.PRICE_SYMBOL}{priceRanges[1]}</span>
    </div>
</div>

<style lang="scss">
    .range{
        --progress-bg: var(--range-progress-bg);
        cursor: pointer;
        .content{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>