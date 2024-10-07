export const formatPrice = (price: number, currency: string): string => {
    // Verificar que la moneda sea una cadena y no esté vacía
    if (typeof currency !== 'string' || !currency) {
        throw new Error('A valid currency code is required.');
    }

    // Formatear el número sin el símbolo de la moneda
    const formattedNumber = new Intl.NumberFormat('es-CO', {
        style: 'decimal',
        minimumFractionDigits: price % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: price % 1 !== 0 ? 2 : 0,
    }).format(price);

    // Agregar manualmente el código de la moneda al resultado formateado
    return `${formattedNumber} ${currency}`;
};
