export function getBookingsRequest() {
    return {
        method: 'GET',
        url: '/bookings',
    };
}

export function createBookingRequest(data) {
    return {
        method: 'POST',
        url: '/bookings',
        data
    };
}
