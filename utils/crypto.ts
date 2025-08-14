/**
 * Utilities to Encryption and Decryption.
 */

import CryptoJS from "crypto-js";

/**
 * Encrypt Function.
 * Melakukan enkripsi pada data.
 *
 * @param {string} input - Data yang akan dienkripsi.
 */
export function encrypt(input: string) {
  return CryptoJS.AES.encrypt(input, process.env.SECRET_KEY).toString();
}

/**
 * Decryption Function.
 * Melakukan dekripsi pada data.
 *
 * @param {string} input - Data yang akan didekripsi.
 */
export function decrypt(input: string) {
  const bytes = CryptoJS.AES.decrypt(input, process.env.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
