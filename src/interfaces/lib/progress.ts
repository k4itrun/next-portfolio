export interface NProgressOptions {
  trickleSpeed?: number;
  minimum?: number;
  showSpinner?: boolean;
  ease?: string;
  speed?: number;
  positionUsing?: string;
  barPosition?: string;
}

export interface NextNProgressProps {
    color?: string;
    startPosition?: number;
    stopDelayMs?: number;
    height?: number;
    showOnShallow?: boolean;
    options?: NProgressOptions;
  }
  