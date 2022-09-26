import { u128 } from 'near-sdk-as';

// Constant used for convertation from near to yocto
const ONE_NEAR = u128.from("1000000000000000000000000");

/**
 * @function toYocto
 * @param amount {number} - Integer to convert
 * @returns {u128}        - Amount in yocto Ⓝ as an unsigned 128-bit integer
 */
 export function toYocto(amount: u128): u128 {
    return u128.mul(ONE_NEAR, u128.from(amount));
  }