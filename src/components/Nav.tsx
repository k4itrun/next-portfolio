import { headerConfig, metaConfig } from '@k4itrunconfig';
import { useTheme } from "@/context/ThemeProvider";

import Button from "@/components/client/Button";
import tailwindConfig from 'tailwind.config';

import { useState } from "react";
import { useRouter } from 'next/router';
import { TransitionChild, Transition } from "@headlessui/react";

import Link from "next/link";
import tinycolor from "tinycolor2";

const { socials } = headerConfig;

const randomColor = (): string => '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');

const colorOptions = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Cyan", hex: "#00FFFF" },
];

const Nav = () => {
    const router = useRouter();
    
    const [heartColor, setHeartColor] = useState<string>(tailwindConfig.theme.extend.colors['color-layout']);

    const [isOpen, setMenu] = useState<boolean>(false);
    const [isSettingsOpen, setSettingsState] = useState<boolean>(false);

    const [isThemeDropdownOpen, setThemeDropdownOpen] = useState<boolean>(false);
    const [isColorDropdownOpen, setColorDropdownOpen] = useState<boolean>(false);

    const { selectedTheme, setTheme, selectedColor, setColor } = useTheme();

    const setIsOpen = (value: Boolean | any) => {
        document.body.style.overflow = value ? 'hidden' : 'auto';
        setMenu(value);
    };

    const setSettingsOpen = (value: Boolean | any) => {
        document.body.style.overflow = value ? 'hidden' : 'auto';
        setSettingsState(value);
    };


    return (
        <>
            <div className="max-w-7xl mx-auto py-12 w-full px-6 lg:px-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold transition-all duration-200">
                            {metaConfig.title}
                            <i
                                onClick={() => { setHeartColor(randomColor()) }}
                                style={{ fontSize: '1.5rem', cursor: 'pointer', color: heartColor }}
                            >.</i>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <i onClick={() => setSettingsOpen(true)} className="fas fa-cog text-2xl text-zinc-400 hover:text-black hover:dark:text-white cursor-pointer bg-gray-500/5 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200" />
                    </div>
                </div>
            </div>

            <Transition show={isSettingsOpen} appear>
                <TransitionChild
                    as={"div"}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 backdrop-blur-sm bg-black/30 z-[999]"
                    onClick={() => setSettingsOpen(false)}
                />
                <TransitionChild
                    enter="transition-transform duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition-transform duration-300"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-black p-6 rounded-lg max-w-md w-full shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-black dark:text-white">Settings</h2>
                                <i onClick={() => setSettingsOpen(false)} className="fa fa-times w-12 h-12 hover:bg-black/10 dark:hover:bg-white/10 text-xl flex items-center justify-center transition-all duration-200 rounded-lg " />
                            </div>
                            <p className="text-black dark:text-white mb-6">
                                Change settings like theme or decorations. Changes are saved automatically.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-8">
                                    <div className="w-1/2">
                                        <label className="flex items-center gap-2 text-black dark:text-white">
                                            <i className="fas fa-adjust"></i>
                                            <span className="font-semibold">Theme</span>
                                        </label>
                                        <div className="relative mt-2">
                                            <button
                                                onClick={() => setThemeDropdownOpen(!isThemeDropdownOpen)}
                                                className="w-full p-2 bg-black/5 hover:bg-black/20 text-black dark:bg-white/5 dark:hover:bg-white/20 dark:text-white rounded-lg text-gray-900 flex justify-between items-center transition-all duration-300 ease-in-out"
                                            >
                                                {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
                                                <i className={`fas fa-chevron-down transition-transform ${isThemeDropdownOpen ? "rotate-180" : ""}`}></i>
                                            </button>
                                            {isThemeDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-2 w-full bg-[rgb(242,242,242)] dark:bg-[rgb(13,13,13)] rounded-lg shadow-lg z-10 backdrop-blur-sm">
                                                    <button
                                                        onClick={() => {
                                                            setTheme("system");
                                                            setThemeDropdownOpen(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20"
                                                    >
                                                        System
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setTheme("dark");
                                                            setThemeDropdownOpen(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20"
                                                    >
                                                        Dark
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setTheme("light");
                                                            setThemeDropdownOpen(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20"
                                                    >
                                                        Light
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200">
                                            <i className="fas fa-palette"></i>
                                            <span className="font-semibold">Colors</span>
                                        </label>
                                        <div className="relative mt-2">
                                            <button
                                                onClick={() => setColorDropdownOpen(!isColorDropdownOpen)}
                                                className="w-full p-2 bg-black/5 hover:bg-black/20 text-black dark:bg-white/5 dark:hover:bg-white/20 dark:text-white rounded-lg text-gray-900 flex justify-between items-center transition-all duration-300 ease-in-out"
                                            >
                                                {selectedColor.name}
                                                <i className={`fas fa-chevron-down transition-transform ${isColorDropdownOpen ? "rotate-180" : ""}`}></i>
                                            </button>
                                            {isColorDropdownOpen && (
                                                <div className="absolute top-full left-0 mt-2 w-full bg-[rgb(242,242,242)] dark:bg-[rgb(13,13,13)] rounded-lg shadow-xl z-10 backdrop-blur-sm">
                                                    {colorOptions.map((color) => {
                                                        const darkerBorderColor = tinycolor(color.hex).darken(10).toString();
                                                        return (
                                                            <button
                                                                key={color.hex}
                                                                onClick={() => {
                                                                    setColor(color);
                                                                    setColorDropdownOpen(false);
                                                                }}
                                                                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-all duration-200 ${color.hex === selectedColor.hex
                                                                    ? 'text-black'
                                                                    : 'text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20'
                                                                    }`}
                                                                style={{
                                                                    backgroundColor: color.hex === selectedColor.hex ? color.hex : '',
                                                                }}
                                                            >
                                                                <span
                                                                    className="w-5 h-5 rounded-full transition-all duration-200"
                                                                    style={{
                                                                        backgroundColor: color.hex,
                                                                        border: `2px solid ${color.hex === selectedColor.hex ? darkerBorderColor : darkerBorderColor}`,
                                                                        boxShadow: `0 0 5px ${color.hex}`,
                                                                    }}
                                                                    onMouseEnter={(e) => ((e.target as HTMLSpanElement).style.boxShadow = `0 0 8px ${color.hex}`)}
                                                                    onMouseLeave={(e) => ((e.target as HTMLSpanElement).style.boxShadow = `0 0 5px ${color.hex}`)}
                                                                />

                                                                <span>{color.name}</span>

                                                                {color.hex === selectedColor.hex && (
                                                                    <span className="ml-auto text-black font-bold">✓</span>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Socials</p>
                                        <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {socials?.map((social, index) => (
                                            <a href={social.link} key={index} target="_blank" rel="noreferrer">
                                                <i className={`fab fa-${social.name} text-2xl text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200 w-12 h-12 flex justify-center items-center bg-gray-500/5 rounded-lg hover:bg-gray-500/10`} />
                                            </a>
                                        ))}
                                        <Link
                                            href="/discord"
                                            id="link"
                                            className="flex gap-2 px-4 items-center w-full h-12 bg-gray-500/5 rounded-lg hover:bg-gray-500/10 transition-all duration-200 text-zinc-400 hover:text-black hover:dark:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <i className="fas fa-envelope text-2xl" />
                                            <p>Contact</p>

                                        </Link>
                                    </div>


                                    <div className="flex justify-end">
                                        <a
                                            href={`https://github.com/k4itrun/${metaConfig.accounts.github.repo}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button className="mt-6 flex items-center gap-1">
                                                <i className=" text-sm text-zinc-400 dark:text-zinc-400 p-1 rounded-full">
                                                    <i className="fas fa-code" />
                                                </i>
                                                <span className="text-xs text-zinc-300 dark:text-zinc-300">View Source Code</span>
                                                <i className="fal fa-arrow-right -rotate-45 text-xs" />
                                            </Button>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionChild>
            </Transition>
        </>
    );
}

export default Nav;