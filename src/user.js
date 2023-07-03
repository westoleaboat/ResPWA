import { writable } from "svelte/store";

let _user = writable({ loggedIn: false });

export function login() {
    _user.set({ loggedIn: true, name: "Welcome, ANON user!"});
}

export const user = {
    subscribe: _user.subscribe,
    login,
};