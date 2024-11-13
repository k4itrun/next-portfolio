import { FooterProps } from "@/interfaces";
import { metaConfig } from "@k4itrunconfig";

import tailwindConfig from 'tailwind.config';

import { useState, useEffect } from "react";
import Link from "next/link";

const randomColor = (): string => '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');

const Footer = ({ better }: FooterProps) => {
    const [heartColor, setHeartColor] = useState<string>(tailwindConfig.theme.extend.colors['color-layout']);

    useEffect(() => {
        const colorInterval = setInterval(() => setHeartColor(randomColor()), 1000);
        return () => clearInterval(colorInterval);
    }, []);

    return (
        <footer className="bg-white/50 dark:bg-black/50 w-full px-6 lg:px-12 py-8 text-zinc-400">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0">
                <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
                    <span className="bg-color-layout text-xs px-2 py-1 rounded-lg">v{metaConfig.version}</span>
                    <span className="hover:text-black dark:hover:text-white transition-colors duration-200">{metaConfig.title}</span>
                </Link>
                <div className="text-center lg:text-right">
                    <p className="mb-1">
                        {metaConfig.title} &copy; 2020 - {new Date().getFullYear()}, All rights reserved.
                    </p>
                    <p className="flex items-center justify-center lg:justify-end space-x-2">
                        <span>Develop without</span>
                        <svg
                            onClick={() => setHeartColor(randomColor())}
                            style={{ cursor: "pointer", fill: heartColor, transition: "fill 0.5s ease" }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>by {metaConfig.title}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;