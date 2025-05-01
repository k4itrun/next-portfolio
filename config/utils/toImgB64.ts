import fetch from "sync-fetch";

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
 let binary = "";
 const uint8Array = new Uint8Array(buffer);
 uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
 return window.btoa(binary);
};

export const toImgB64 = (url: string): string => {
 try {
  const res: { arrayBuffer: () => ArrayBuffer } = fetch(url);
  const arrayBuffer = res.arrayBuffer();
  const base64Data = `data:image/png;base64,${arrayBufferToBase64(arrayBuffer)}`;
  return base64Data;
 } catch (_error) {
  return "";
 }
};
