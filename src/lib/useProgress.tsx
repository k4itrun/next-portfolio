import { NextNProgressProps } from '@/interfaces';
import tailwindConfig from 'tailwind.config';

import { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

const NextNProgress = ({
  color = tailwindConfig.theme.extend.colors['color-layout'],
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  showOnShallow = true,
  options,
}: NextNProgressProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const routeChangeStart = (_: string, { shallow }: { shallow: boolean }) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition);
      NProgress.start();
    }
  };

  const routeChangeEnd = (_: string, { shallow }: { shallow: boolean }) => {
    if (!shallow || showOnShallow) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [options, showOnShallow, startPosition, stopDelayMs]);

  return (
    <style jsx global>{`
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
    `}</style>
  );
}

export default NextNProgress;