<script>
    import { user } from '../user';
    import { onDestroy } from 'svelte';
    let _user;
    const unsubscribe = user.subscribe(u => _user = u);
    onDestroy(unsubscribe);
</script>

<div>
    { $user.name || 'Not logged in'}
    <!-- How to get the username in here? -->
</div>
<style>
    div {
        /* background: white; */
        color: white;
        /* padding: 5px 10px; */
        text-align: right;
    }
</style>
     