export interface ColorOption {
    name: string;
    hex: string;
    default?: boolean;
}

interface GlobalConfig {
    defaultColor: string;
    colorOptions: ColorOption[];
}

export const globalConfig: GlobalConfig = {
    defaultColor: "#FF00FF",
    colorOptions: [
        { name: "Magenta", hex: "#FF00FF", default: true },
        { name: "Red", hex: "#FF0000" },
        { name: "Green", hex: "#00FF00" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Cyan", hex: "#00FFFF" },
    ]
};