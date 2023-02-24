<script>
    export let label="";
    export let locations="";
    export let selected="";
    let className;
    function setValue() {
        selected!=''?className = "move-up":className='';
    }
</script>

<label class="drop-down">
    <span class={className} for="location">{label}</span>
    <select name="location" placeholder={label} bind:value={selected} on:change="{setValue}">
        <option value="" class={className} disabled selected hidden>{label}</option>
		{#each locations as location}
			<option value={location}>
				{location}
			</option>
		{/each}
	</select>
</label>


<style lang="scss">
    .drop-down{
        position: relative;
        span{
            display: none;
            position: absolute;    
            bottom: 0;
            left: 2%;
            font-size: 1.2rem;
            color: var(--calendar-font); 
            transition: all 0.2s ease;
        }
        select{
            height: 5rem;
            border: 0;
            border-radius: 5px;
            padding: 0 1.5rem;
            font-size: 1.2rem;
            width: 100%;
            outline: none;
            color: var(--calendar-font);
            background-color: var(--calendar-bg);
            -webkit-appearance: none;
            -moz-appearance: none;
        }
        span.move-up{
            display: block;
            left:2rem;
            font-size: 0.75rem;
            top: -1.5rem;
        }
    }
</style>