export function createSignInRequest(data) {
    return {
        method: 'POST',
        url: '/auth/sign-in',
        data: data
    };
}
