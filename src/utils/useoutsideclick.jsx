// import { useEffect } from "react";

// const useOutsideClick = (ref, callback, exceptionSelector = null) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Ensure event.target is a DOM element before calling closest
//       if (event.target && event.target.closest) {
//         // If exceptionSelector is provided, check if the click is inside the exception (e.g., NavLink)
//         if (exceptionSelector && event.target.closest(exceptionSelector)) {
//           return; // If the click is inside a valid link, don't trigger the callback
//         }
//       }

//       // If the click is outside the referenced element, trigger the callback
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback();
//       }
//     };

//     // Add event listeners
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("touchstart", handleClickOutside);
//     document.addEventListener("resize", handleClickOutside);
//     document.addEventListener("scroll", handleClickOutside);
//     document.addEventListener("touchmove", handleClickOutside);

//     // Clean up the event listeners when component unmounts or ref changes
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//       document.removeEventListener("resize", handleClickOutside);
//       document.removeEventListener("scroll", handleClickOutside);
//       document.removeEventListener("touchmove", handleClickOutside);
//     };
//   }, [ref, callback, exceptionSelector]);
// };

// export default useOutsideClick;
import { useEffect } from "react";

const useOutsideClick = (ref, callback, exceptionSelector = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If exceptionSelector is provided, check if the click is inside the exception (e.g., NavLink)
      if (exceptionSelector && event.target.closest(exceptionSelector)) {
        return; // If the click is inside a valid link, don't trigger the callback
      }

      // If the click is outside the referenced element, trigger the callback
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Handle scroll, resize, and mousemove events globally
    const handleGlobalEvents = () => {
      if (ref.current && !ref.current.contains(document.activeElement)) {
        callback();
      }
    };

    // Add event listeners for mouse, touch, resize, scroll, and touchmove
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("resize", handleGlobalEvents);
    window.addEventListener("scroll", handleGlobalEvents);
    document.addEventListener("touchmove", handleGlobalEvents);

    // Clean up event listeners when the component unmounts or the ref changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("resize", handleGlobalEvents);
      window.removeEventListener("scroll", handleGlobalEvents);
      document.removeEventListener("touchmove", handleGlobalEvents);
    };
  }, [ref, callback, exceptionSelector]);
};

export default useOutsideClick;
