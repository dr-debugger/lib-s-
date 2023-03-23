export async function ENCRYPT(
  plaintext,
  key = "88b78fc641b290f147fa6764a0daa7df"
) {
  // converts string to Uint8Array
  const keyEncoded = new TextEncoder().encode(key);
  const encoded = new TextEncoder().encode(plaintext);
  // generate random initialization vector
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const algorithm = { name: "AES-GCM", iv: iv };
  // transforms a string into a CryptoKey object which can be used to perform encryption
  const keyObject = await crypto.subtle.importKey(
    "raw",
    keyEncoded,
    algorithm,
    false,
    ["encrypt"]
  );
  //encryption
  const ciphertext = await crypto.subtle.encrypt(algorithm, keyObject, encoded);
  return {
    iv: btoa(String.fromCharCode.apply(null, iv)),
    encrypted: btoa(
      String.fromCharCode.apply(null, new Uint8Array(ciphertext))
    ),
  };
}
