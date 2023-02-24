<script>
    export let className;
    export let inverse=true;
    export let disable = false;
</script>

<button class={className} class:inverse={!inverse} on:click disabled={disable} >
        <slot/>
</button>

<style lang="scss">
    button{
        cursor: pointer;
        border: 0;
        font-weight: 500;
    }
    button:disabled{
        cursor: not-allowed;
        opacity: 0.5;
    }
    .reset{
        color: rgba(0,0,0,0.5);
        background-color: transparent;
    }
    .flight-card{
        padding: 0.5rem 2.5rem;
        border-radius: 5px;
        background-color: var(--flight-card-book-bg);
        color: var(--flight-card-book-text);
    }
    .search{
        padding: 1.5rem 3.5rem;
        border-radius: 2px;
        background-color: var(--primary-color);
        color: var(--primary-bg-text-color);
        font-size: 1.2rem;
        text-transform: capitalize;
    }
    .left{
        border-radius: 5px 0 0 5px;
    }
    .right{
        border-radius: 0 5px 5px 0;
    }
    .selected{
        padding: 0.5rem 3.5rem;
        background-color: var(--primary-color);
        color: var(--primary-bg-text-color);
        font-size: 1rem;
        text-transform: capitalize;
    }
    .selected.inverse{
        padding: 0.5rem 3.5rem;
        background-color: var(--toggler-inverse-bg);
        color: var(--primary-color);
        font-size: 1rem;
        text-transform: capitalize;
    }
</style>