<script>
    import FlightPlanner from "../components/FlightPlanner.svelte";
	import { cities, availableFlights } from "../stores/Flights.store";
	import { onMount } from "svelte";
	onMount(async () => {
		fetch("https://run.mocky.io/v3/8b1d2b79-0b1f-4f9f-bd56-17c5aad99ac5",{
			headers:{
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers':'*'
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			cities.set(data)
		}).catch(error => {
			console.log(error);
			return [];
		});
		fetch("https://run.mocky.io/v3/6229c6e5-4d44-4d1b-8060-78a5160e13f6",{
			headers:{
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers':'*'
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			availableFlights.set(data)
		}).catch(error => {
			console.log(error);
			return [];
		});
	});
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