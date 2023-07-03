<script>
    import Form from './Form.svelte';
    import { user, login } from '../user';
    import { spots } from '../coordinatesStore';

    $: authenticated = $user.loggedIn;
</script>

{#if authenticated}
        <h1>registering a new RES</h1>
        <Form />
{:else}
    <h2>Login to register a RES</h2>
    <button on:click={() => user.login()}>Fast Login</button>
{/if}

<style>
    h1, h2{
        display: flex;
        justify-content: center;
    }
    /* h2 {
        display: flex;
        justify-content: center;
    } */

    button{
        display: flex;
    }
</style>