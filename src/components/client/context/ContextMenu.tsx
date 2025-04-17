'use client';

import { KeyShortcut } from '@/components/client/KeyShortcut';
import { useEffect, useState, ReactNode } from 'react';
import { Icons } from '@/components/Icons';

interface IEventActions {
  hasForward: boolean;
  hasBack: boolean;
  goBack: () => void;
  goForward: () => void;
  refreshPage: () => void;
  viewGithub: () => void;
  viewYoutube: () => void;
}

interface IItemProps {
  icon?: ReactNode;
  text: string;
  kbd?: string[];
  onClick?: () => void;
}

export const MenuItem = ({ icon, text, kbd, onClick, ...props }: IItemProps) => {
  return (
    <div className="text-sm flex flex-col" onClick={onClick} {...props}>
      <div className="flex gap-2 justify-between items-center w-full hover:bg-black/5 dark:hover:bg-white/5 p-2 px-4 transition-all duration-200">
        <div className="flex items-center gap-2">
          {icon}
          <p>{text}</p>
        </div>
        {kbd && <KeyShortcut keys={kbd} />}
      </div>
    </div>
  );
};

const renderContextMenu = ({ hasBack, hasForward, goBack, goForward, refreshPage, viewGithub, viewYoutube }: IEventActions) => {
  const renderMenuItem = (icon: JSX.Element, text: string, onClick: () => void, kbd: string[] = []) => (
    <>
      <MenuItem icon={icon} text={text} onClick={onClick} {...(kbd.length > 0 ? { kbd } : {})} />
    </>
  );

  return (
    <>
      <div>
        {hasBack && renderMenuItem(<Icons.ArrowLeft className="w-5 h-5 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" />, 'Back', goBack, ['Alt', '◀'])}
        {hasForward && renderMenuItem(<Icons.ArrowRight className="w-5 h-5 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" />, 'Forward', goForward, ['Alt', '▶'])}
        {renderMenuItem(<Icons.Redo className="w-5 h-5 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" />, 'Refresh', refreshPage, ['Ctrl', 'R'])}
      </div>
      <div className="pt-3">
        {renderMenuItem(<Icons.Github className="w-4 h-4 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" />, 'Github', viewGithub)}
        {renderMenuItem(<Icons.Youtube className="w-4 h-4 fill-neutral-700/50 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white transition-all duration-200" />, 'YouTube', viewYoutube)}
      </div>
    </>
  );
};

export const ContextMenu = ({ children }: { children: ReactNode }) => {
  const [isBackEnabled, setIsBackEnabled] = useState(false);
  const [isForwardEnabled, setIsForwardEnabled] = useState(false);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const menu = document.querySelector('.context-menu') as HTMLElement;
      const { pageX: x, pageY: y } = event;
      const { innerWidth: windowWidth, innerHeight: _windowHeight } = window;

      if (menu) {
        menu.style.left = x + menu.offsetWidth > windowWidth ? `${windowWidth - menu.offsetWidth - 24}px` : `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.display = 'block';
      }
    };

    const handleClickOutside = () => {
      const menu = document.querySelector('.context-menu') as HTMLElement;
      if (menu) menu.style.display = 'none';
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const hasHistory = window.history.length > 1;
    setIsBackEnabled(hasHistory);
    setIsForwardEnabled(hasHistory);
  }, []);

  const actions: IEventActions = {
    hasForward: isForwardEnabled,
    hasBack: isBackEnabled,
    goBack: () => window.history.back(),
    goForward: () => window.history.forward(),
    refreshPage: () => window.location.reload(),
    viewGithub: () => window.open('https://github.com/k4itrun/', '_blank'),
    viewYoutube: () => window.open('https://youtube.com/channel/UCa6sR_p87T0kB4FdvOJiVjw', '_blank'),
  };

  return (
    <>
      <div
        className="context-menu absolute bg-white dark:bg-black rounded-lg shadow-xl py-2 w-72 divide-y divide-gray-600/10 space-y-2"
        style={{
          display: 'none',
          zIndex: 9 * 10000,
        }}
      >
        {renderContextMenu(actions)}
      </div>
      {children}
    </>
  );
};
