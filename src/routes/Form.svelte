<script>
    import { each, listen } from 'svelte/src/runtime/internal';
    import { spots } from '../coordinatesStore';

    import { createEventDispatcher } from "svelte";

    let selectedLocation = '';

    // const last = spots.split(',').map(item => item.trim());
    // const lastItem = last[last.length -1];
    
    const dispatch = createEventDispatcher();

    function handleLocationChange() {
        dispatch('selectedLocationChange', selectedLocation);
        console.log('selected location :',selectedLocation)
    }

    let locationValue = selectedLocation;
    let itemsValue = '';
    let timeValue = '';
    // let spots = [];
    // export let spots;
     



    function handleSubmit() {
        // import spots from './Map.svelte'
        const newSpot = {
            location: locationValue,
            items: itemsValue,
            time: timeValue
        };

        // spots = [...spots, newSpot];

    //   inputValue = '';
        locationValue = '';
        itemsValue = '';
        timeValue = '';
      // Handle form submission
    //   console.log('Form submitted!', newSpot);
      console.log(spots)

    //   console.log(`Longitude: {coordinates.lng}<br />Latitude: ${lngLat.lat}`)
    }

    
</script>
  
<section>

    <form on:submit|preventDefault={handleSubmit}>
        <label for="locationField">Location:</label>
        {#if $spots.length === 0}
        <!-- <input type="text" id="locationField" bind:value={locationValue} /> -->
        <input type="text" id="locationField" value="select an option from map" disabled />
        {:else}
        <!-- <input type="text" id="locationField" bind:value={spots[0]} /> -->
        <!-- {#each $spots as spot} -->
        { spots }
        
        {/if}
        <label for="itemsField">Items:</label>
        <input type="text" id="itemsField" bind:value={itemsValue} />
      
        <label for="timeField">Time:</label>
        <input type="time" id="timeField" bind:value={timeValue} />
      
        <button type="submit">Submit</button>
    </form>

    <!-- <p>Selected Name: {selectedName}</p> -->
    <div class="spots">
    {#if $spots.length === 0}
        <h2>No entries so far...</h2>
    {:else}
        <ul class="spots-list">
            {#each $spots as spot}
                <li>{spot}</li>
                <!-- <li>Location: {spot.location}</li>
                <li>Items: {spot.items}</li>
                <li>Time: {spot.time}</li> -->
            {/each}
        </ul>
    {/if}
    </div>

  
</section>

<style>
    section{
        display: flex;
        justify-content: center;
        align-items: center;
        /* flex-direction: column; */
    }
    
    ul {
        display: flex;
    }

    .spots-list {
        flex-direction: column;
    }

    form {
        display: flex;
        flex-direction: column;
    }
    .spots{

    } 
</style>