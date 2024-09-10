import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { EmbloyH, EmbloyV } from '@/app/components/ui/misc/stuff';
import { EmbloyP } from '@/app/components/ui/misc/text';

export const ProgressLoadingScreen = ({ task, className, forceProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    const duration = 39000; // 39 seconds
    const updateInterval = 100; // Update every 100ms
    const increment = (updateInterval / duration) * 100;

    const startProgress = () => {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + increment;
        });
      }, updateInterval);
    };

    // If forceProgress is 'start', reset progress and restart interval
    if (forceProgress === 'start' || forceProgress === 'restart') {
      setProgress(0);
      startProgress();
    } else if (forceProgress === 'stop') {
        // Stop and reset the progress
        clearInterval(interval);
        setProgress(0);
      }
      else if (forceProgress === 'success') {
        // Stop and reset the progress
        setProgress(100);
        startProgress();
      } else {
      startProgress();
    }

    return () => {
      clearInterval(interval);
    };
  }, [forceProgress]);

  return (
    <EmbloyV className={`min-w-[350px] max-w-fit max-h-fit items-center justify-end ${className}`}>
      <EmbloyH>
        <EmbloyP className="text-xs text-red-500 dark:text-red-500">
          This takes 30 seconds. Please wait! Don&apost refresh the page.
        </EmbloyP>
      </EmbloyH>
      <EmbloyH>
        <LinearProgress
          variant="determinate"
          value={progress}
          className="rounded-full w-full h-[5px]"
        />
      </EmbloyH>
    </EmbloyV>
  );
};
