export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');

    return (cpf.length === 11);
};

export const validateCnpj = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, '');

    return (cnpj.length === 14);
};

export const validatePassword = (password) => {
    return (password.length >= 8);
};