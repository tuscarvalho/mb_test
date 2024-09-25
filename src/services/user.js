const baseURL = 'http://localhost:3000';

export async function fetchRegisters() {
    const response = await fetch(`${baseURL}/registration`);
    return response;
};

export async function register(user) {
    const response = await fetch(`${baseURL}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    return response;
};