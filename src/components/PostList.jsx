import { useRef } from "react";
import { Post } from "./Post";

/**
 * @type {Map<object, (t: number) => void>}
 */
const m = new Map();

function PostList() {
  const postMap = useRef(m);
  /**
   * @type {IntersectionObserver}
   */
  const io = useRef(null);

  useEffect(() => {
    io.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          postMap.current.get(entry.target)?.(entry.intersectionRatio);
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      io.current.disconnect();
    };
  }, []);

  function observe(el, updateCb) {
    io.current.observe(el);
    postMap.current.set(el, updateCb);
  }

  return (
    <>
      <Post observe={observe} />
      <Post observe={observe} />
      <Post observe={observe} />
      <Post observe={observe} />
    </>
  );
}
