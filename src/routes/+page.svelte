<!-- App.svelte -->
<script>
    import Map from './Map.svelte';
    import Topbar from './Topbar.svelte';
	import AuthOnly from './AuthOnly.svelte';
    
</script>

  
<main>
<Topbar />

  <Map />

<!-- <AuthOnly /> -->
 
</main>

<style>
    *{
        margin: 0;
    }
    main {
        background-color: #51C93E;
    }
</style>