<script>
    // import { each, listen } from 'svelte/src/runtime/internal';
    import { spots } from '../coordinatesStore';

    import { createEventDispatcher } from "svelte";

    // let selectedLocation = '';

    // const last = spots.split(',').map(item => item.trim());
    // const lastItem = last[last.length -1];
    
    const dispatch = createEventDispatcher();

    // function handleLocationChange() {
    //     dispatch('selectedLocationChange', selectedLocation);
    //     console.log('selected location :',selectedLocation)
    // };

    let selectedLocation = {$spots};
    let locationValue = selectedLocation;
    let itemsValue = '';
    let timeValue = '';
    // let spots = [];
    let collection = [];
    // export let spots;
     

    function handleSubmit() {
        // import spots from './Map.svelte'
        const newCollection = {
            location: {$spots},
            items: itemsValue,
            time: timeValue
        };

        collection = [...collection, newCollection]

        $spots = '';
        itemsValue = '';
        timeValue = '';

        console.log(collection[0])

    }

    
</script>
  
<section>

    <form on:submit|preventDefault={handleSubmit}>
        <label for="locationField">Location:</label>
        {#if $spots.length === 0}
        <input type="text" id="locationField" value="select an option from map" disabled />
        {:else}
        <input type="text" id="locationField" bind:value={$spots} />
        
        {/if}
        <label for="itemsField">Items:</label>
        <input type="text" id="itemsField" bind:value={itemsValue} />
      
        <label for="timeField">Time:</label>
        <input type="time" id="timeField" bind:value={timeValue} />
      
        <button type="submit">Submit</button>
    </form>

    <!-- <p>Selected Name: {selectedName}</p> -->
    <div class="spots">
    {#if collection.length === 0}
        <h2>No entries so far...</h2>
    {:else}
        {#each collection as col}

        <ul class="spots-list">
            <!-- {#each collection as col} -->
                <li>{col.location.$spots}</li>

                <li>{col.items}</li>
                <li>{col.time}</li>
                
            <!-- {/each} -->
        </ul>
        {/each}

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
        border: 2px solid red;
    }

    form {
        display: flex;
        flex-direction: column;
    }
    .spots{

    } 
</style>