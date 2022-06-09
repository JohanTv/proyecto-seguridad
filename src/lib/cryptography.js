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

export async function encryptPassword(masterPassword, salt, passwordInp){
    const saltIv = window.crypto.getRandomValues(new Uint8Array(16));
    const vaultKey = await getDeriveKey(masterPassword, str2arr(salt));
    const enc = new TextEncoder();

    const cipherText = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: saltIv },
        vaultKey,
        enc.encode(passwordInp)
    );
    const buffer = new Uint8Array(cipherText);
    return {cipherText: arr2str(buffer), salt: arr2str(saltIv)};
}

export async function decryptPassword(masterPassword, salt, password, saltIv){
    const vaultKey = await getDeriveKey(masterPassword, str2arr(salt));
    const cipherText = str2arr(password);
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: str2arr(saltIv) },
        vaultKey,
        cipherText
    );

    let dec = new TextDecoder();
    return dec.decode(decrypted);
}

async function getPasswordHashStr(masterPassword, userSalt){
    let key = await getDeriveKey(masterPassword, userSalt);
    const exported = await window.crypto.subtle.exportKey(
        "raw",
        key
    );
    return ab2str(exported);
}

function getKeyMaterial(password) {
    const enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw", 
      enc.encode(password), 
      {name: "PBKDF2"}, 
      false, 
      ["deriveBits", "deriveKey"]
    );
}

async function getDeriveKey(password, userSalt){
    const keyMaterial = await getKeyMaterial(password);
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