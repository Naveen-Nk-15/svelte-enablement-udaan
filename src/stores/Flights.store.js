import { writable } from 'svelte/store';

export const oneWayFlights = writable([]);

export const roundTripFlights = writable([]);

export const isRoundTrip = writable(false);

export const availableFlights = writable([]);

export const cities = writable([]);

export const fromLocation = writable('');

export const toLocation = writable('');

export const returnDate = writable('');

export const depatureDate = writable('');