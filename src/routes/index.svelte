<script context="module">
	export function preload(page){
		return this.fetch("http://localhost:3001/cities")
		.then(response => response.json())
		.then(data => {
			// console.log(data+"in server");
			return {cityData : data};
		}).catch(error => {
			console.log(error);
			return [];
		});
	}
</script>
<script>
    import FlightPlanner from "../components/FlightPlanner.svelte";
	import {cities} from "../stores/Flights.store";
	export let cityData;
	
	cities.set(cityData.cities);
	
</script>

<div class="wrapper">
    <FlightPlanner className="home" searchLabel="search"/>
</div>

<style lang="scss">

    .wrapper{
        background-image: url("../images/bgFlight.png");
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
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