export async function createAuth(masterPassword){
    const userSalt = crypto.getRandomValues(new Uint8Array(16));
    const vaultKey = await getPasswordHashStr(masterPassword, userSalt);
    const auth = await getPasswordHashStr(masterPassword, str2arr(vaultKey));
    return {hash: auth, salt: arr2str(userSalt)};
}

export async function validate(passwordInp, hash, salt){
    const vaultKey = await getPasswordHashStr(passwordInp, str2arr(salt));
    const auth = await getPasswordHashStr(passwordInp, str2arr(vaultKey));
    return auth === hash;
}

async function getPasswordHashStr(masterPassword, userSalt){
    let keyMaterial = await getKeyMaterial(masterPassword);
    let key = await getDeriveKey(keyMaterial, userSalt);
    const exported = await window.crypto.subtle.exportKey(
        "raw",
        key
    );
    return ab2str(exported);
}

function getKeyMaterial(password) {
    let enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw", 
      enc.encode(password), 
      {name: "PBKDF2"}, 
      false, 
      ["deriveBits", "deriveKey"]
    );
}

function getDeriveKey(keyMaterial, userSalt){
    return window.crypto.subtle.deriveKey(
        {
          "name": "PBKDF2",
          salt: userSalt,
          "iterations": 10000,
          "hash": "SHA-256"
        },
        keyMaterial,
        { "name": "AES-CBC", "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );
}

function ab2str(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function arr2str(arr){
    return btoa(String.fromCharCode(...arr));
}

function str2arr(str) {
    str = atob(str);
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);

    for (let i = 0; i < str.length; i++)
      bufView[i] = str.charCodeAt(i);

    return bufView;
}