import { useEffect } from "react";

export function Post({ observe }) {
  const elRef = useRef(null);
  const hasVideo = false;

  useEffect(() => {
    if (hasVideo) {
      observe(elRef.current, (t) => {});
    }
  }, []);

  return (
    <div ref={elRef} data-post-id={id}>
      <h1>Post</h1>
    </div>
  );
}
