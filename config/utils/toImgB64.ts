import fetch from 'sync-fetch';

interface Fetch {
    arrayBuffer: () => ArrayBuffer;
}

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const uint8Array = new Uint8Array(buffer);
    uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
};

export const toImgB64 = (url: string): string => {
    try {
        const response = fetch(url) as Fetch;
        const arrayBuffer = response.arrayBuffer();
        const base64Data = `data:image/png;base64,${arrayBufferToBase64(arrayBuffer)}`;
        return base64Data;
    } catch (error) {
        return '';
    }
};