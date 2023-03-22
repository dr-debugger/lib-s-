// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
const generateKey = async () => {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encode = (data) => {
  const encoder = new TextEncoder();
  return encoder.encode(data);
};

// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const generateIv = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
  return window.crypto.getRandomValues(new Uint8Array(12));
};

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
const encrypt = async (data, key) => {
  const encoded = encode(data);
  const iv = generateIv();
  const cipher = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoded
  );
  return {
    cipher,
    iv,
  };
};

/**
 *  https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 * @param {*} buffer
 * @desc Convert data buffers into base64-encoded strings
 * @returns base64-encoded strings
 */

const pack = (buffer) => {
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
};

/**
 *
 * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 * @param {*} packed
 * @desc base64-encoded strings back into raw binary buffers.
 * @returns raw binary buffers
 */
const unpack = (packed) => {
  const string = window.atob(packed);
  const buffer = new ArrayBuffer(string.length);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }
  return buffer;
};

// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
const decode = (bytestream) => {
  const decoder = new TextDecoder();
  return decoder.decode(bytestream);
};

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
const decrypt = async (cipher, key, iv) => {
  const encoded = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    cipher
  );
  return decode(encoded);
};

const app = async () => {
  // encrypt message
  const first = "Hello, World!";
  const key = await generateKey(); // 88b78fc641b290f147fa6764a0daa7df
  const { cipher, iv } = await encrypt(first, key);

  const cipherToString = pack(cipher),
    IvToString = pack(iv);

  console.log(cipherToString, IvToString);

  return {
    cipherToString,
    IvToString,
  };

  // send these into body 👆

  // retrieve
  // const response = await fetch("/secure-api").then((res) => res.json());
  // unpack and decrypt message
  // const final = await decrypt(
  //   unpack(response.cipher),
  //   key,
  //   unpack(response.iv)
  // );
  // console.log(final); // logs 'Hello, World!'
};
