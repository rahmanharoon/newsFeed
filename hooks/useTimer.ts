import { useEffect, useState } from "react";

export const useTimer = (cb: () => void, ref: any) => {
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    if (timer === 1) {
      setTimeout(cb, 1000);
    }
    const newTime = () => {
      setTimer((prev: number) => {
        if (ref?.current?.reset) {
          ref.current.reset = false;
          return 10;
        }
        if (prev === 1) {
          return 10;
        } else {
          return prev - 1;
        }
      });
    };

    setTimeout(newTime, 1000);
  }, [timer]);

  return { timer };
};
