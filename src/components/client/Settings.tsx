'use client';

import { header, meta, globalConfig } from '@9ll-fun/config';
import { useTheme } from '@/components/client/context/ThemeProvider';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { Icons } from '@/components/Icons';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import tinycolor from 'tinycolor2';
import Select from '@/components/client/Select';

const { socials } = header;

export const Settings = () => {
  const [isSettingsOpen, setSettingsState] = useState<boolean>(false);
  const { selectedTheme, setTheme, selectedColor, setColor } = useTheme();

  return (
    <>
      <Button
        variant="secondary"
        aria-label="Open settings"
        icon={false}
        onClick={() => setSettingsState(true)}
        className={cn(
          {
            '!bg-neutral-300 dark:!bg-white/15': isSettingsOpen,
            '!bg-transparent hover:!bg-neutral-300 dark:hover:!bg-white/15': !isSettingsOpen,
          },
          'group ml-auto flex h-10 w-10 items-center justify-center px-2 !outline-none'
        )}
      >
        <Icons.SettingsIcon
          className={cn(
            {
              'rotate-90 dark:text-white': isSettingsOpen,
              'text-neutral-800 dark:text-neutral-200': !isSettingsOpen,
            },
            'h-5 w-5 shrink-0 duration-200 motion-reduce:transition-none dark:group-hover:text-white'
          )}
        />
      </Button>
      <Dialog transition as="div" className="fixed inset-0 z-50 ease-out focus:outline-none" open={isSettingsOpen} onClose={() => setSettingsState(false)}>
        <DialogBackdrop transition className="fixed inset-0 bg-black/50 duration-200 data-[closed]:opacity-0 motion-reduce:transition-none backdrop-blur-sm" />
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="border dark:border-neutral-800/35 bg-white dark:bg-black p-6 rounded-lg max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black dark:text-white">Settings</h2>
              <Button
                variant="secondary"
                aria-label="Open settings"
                icon={false}
                onClick={() => setSettingsState(false)}
                className={cn(
                  {
                    '!bg-transparent hover:!bg-neutral-300 dark:hover:!bg-white/15': isSettingsOpen,
                  },
                  'group ml-auto flex h-10 w-10 items-center justify-center px-2 !outline-none'
                )}
              >
                <Icons.X
                  className={cn(
                    {
                      'text-neutral-800 dark:text-neutral-200': isSettingsOpen,
                    },
                    'h-5 w-5 shrink-0 duration-200 motion-reduce:transition-none dark:group-hover:text-white'
                  )}
                />
              </Button>
            </div>
            <p className="text-black dark:text-white mb-6">Change settings like theme or decorations. Changes are saved automatically.</p>
            <div className="space-y-4">
              <div className="flex justify-center gap-8">
                <div className="flex cursor-auto select-none flex-col items-center py-3 text-base text-neutral-800 dark:text-white">
                  <div className="flex items-center">
                    <Icons.Palette className="mr-2 size-5 text-neutral-800/80 dark:text-neutral-300/50" />
                    <span>Colors</span>
                  </div>
                  <div className="mt-2 w-40">
                    {!selectedColor ? (
                      <div className="flex h-10 w-full items-center justify-center text-neutral-800 dark:text-white">
                        <Icons.RefreshCw className="size-5 animate-spin" />
                      </div>
                    ) : (
                      <Select
                        text={
                          <>
                            <span
                              className="mr-1 size-5 rounded-full"
                              style={{
                                backgroundColor: selectedColor.hex,
                                border: `2px solid ${tinycolor(selectedColor.hex).darken(10).toString()}`,
                                boxShadow: `0 0 5px ${selectedColor.hex}`,
                              }}
                            />
                            <span>{selectedColor.name}</span>
                          </>
                        }
                        value={selectedColor.hex}
                        onChange={(value) => setColor(globalConfig.colorOptions.find((color) => color.hex === value))}
                        options={globalConfig.colorOptions.map((color) => ({
                          value: color.hex,
                          disabled: color.hex === selectedColor.hex,
                          text: (
                            <>
                              <span
                                className="mx-2 size-5 rounded-full"
                                style={{
                                  backgroundColor: color.hex,
                                  border: `2px solid ${tinycolor(color.hex).darken(10).toString()}`,
                                  boxShadow: `0 0 5px ${color.hex}`,
                                }}
                              />
                              <span>{color.name}</span>
                            </>
                          ),
                        }))}
                      />
                    )}
                  </div>
                </div>

                <div className="flex cursor-auto select-none flex-col items-center py-3 text-base text-neutral-800 dark:text-white">
                  <div className="flex items-center">
                    <Icons.SunMoon className="mr-2 size-5 text-neutral-800/80 dark:text-neutral-300/50" />
                    <span>Theme</span>
                  </div>
                  <div className="mt-2 w-40">
                    {!selectedTheme ? (
                      <div className="flex h-10 w-full items-center justify-center text-neutral-800 dark:text-white">
                        <Icons.RefreshCw className="size-5 animate-spin" />
                      </div>
                    ) : (
                      <Select
                        text={
                          <>
                            {selectedTheme === 'dark' ? (
                              <>
                                <Icons.Moon className="mr-1 size-5" />
                                <span>Dark</span>
                              </>
                            ) : (
                              <>
                                <Icons.Sun className="mr-1 size-5" />
                                <span>Light</span>
                              </>
                            )}
                          </>
                        }
                        value={selectedTheme}
                        onChange={(value) => setTheme(value)}
                        options={[
                          {
                            value: 'system',
                            text: (
                              <>
                                <Icons.Laptop className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                                <span>System</span>
                              </>
                            ),
                          },
                          {
                            value: 'dark',
                            disabled: selectedTheme === 'dark',
                            text: (
                              <>
                                <Icons.Moon className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                                <span>Dark</span>
                              </>
                            ),
                          },
                          {
                            value: 'light',
                            disabled: selectedTheme === 'light',
                            text: (
                              <>
                                <Icons.Sun className="mx-2 size-5 text-neutral-800 duration-200 motion-reduce:transition-none dark:text-neutral-200" />
                                <span>Light</span>
                              </>
                            ),
                          },
                        ]}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase text-black/50 dark:text-white/10">Socials</p>
                  <div className="w-full h-0.5 bg-black/50 dark:bg-white/10" />
                </div>
                <div className="flex items-center gap-4">
                  {socials?.map((social, index) => {
                    const IconComponent = Icons[social.name];
                    return (
                      <Link key={index} target="_blank" href={social.link} rel="noreferrer">
                        {IconComponent ? <IconComponent className="w-6 h-6 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" /> : <Icons.XIcon className="w-6 h-6 text-red-700/70 hover:text-red-700" />}
                      </Link>
                    );
                  })}
                  <Button variant="tertiary" href="/discord" className="flex w-full gap-2 px-4 h-11 ml-auto justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.Mail className="text-lg" />
                      <span className="">Contact</span>
                    </div>
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button href={`https://github.com/k4itrun/${meta.accounts.github.repo}`} className="mt-6 flex items-center h-11 gap-1 ml-auto justify-between bg-color-layout hover:bg-color-layout">
                    <div className="flex items-center gap-2">
                      <Icons.Code2 className="text-lg" />
                      <span className="text-xs text-zinc-300">View Source Code</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
