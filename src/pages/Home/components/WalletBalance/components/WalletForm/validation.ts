export const validation = {
    address: {
        required: 'Field is required',
        pattern: {
            value: /^(0x)?[0-9a-fA-F]{40}$/,
            message: 'ETH address is not valid',
        }
    }
}
