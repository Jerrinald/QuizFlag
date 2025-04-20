import JSEncrypt from 'jsencrypt';

export async function encryptBestScore(bestScore) {
    try {
        const publicKeyPem = import.meta.env.VITE_PUBLIC_KEY?.replace(/\\n/g, '\n');

        if (!publicKeyPem) {
            throw new Error("Public key not found in env");
        }
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKeyPem);
        const encrypted = encryptor.encrypt(bestScore.toString());

        if (!encrypted) {
            throw new Error("Encryption failed");
        }

        return encrypted;
    } catch (error) {
        console.error("Encryption error:", error);
        throw error;
    }
}
