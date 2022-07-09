/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

// Target date passed as string because props to islands
// need to be JSON (de)serializable
export default function Countdown(props: { target: string }) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());

  // Setup interval to update `now` every second with the
  // current date
  useEffect(() => {
    const timer = setInterval(() => {
      setNow((now) => {
        if (now > target) {
          clearInterval(timer);
        }
        return new Date();
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);

  // If target has passed, stop counting
  if (now > target) {
    return <span>🎉</span>;
  }

  // Otherwise, format remaining time
  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);
  return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
}
