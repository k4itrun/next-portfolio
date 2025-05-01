export const formatTime = (ms: number) => {
 const minutes = Math.floor(ms / 60000);
 const seconds = Math.floor((ms % 60000) / 1000);
 return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
