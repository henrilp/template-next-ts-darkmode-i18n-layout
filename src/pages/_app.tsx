// reset user agent stylesheet THEN apply global style
import { useState, useEffect } from "react";
import "styles/reset.css";
import "styles/fonts.scss";
import "styles/global.scss";
import { DrawerProvider } from "context/drawerContext";
import useDarkMode from "use-dark-mode";
import Script from "next/script";

function App({ Component, pageProps }) {
  // kind of a trick for combining darkMode and SSR... not sure it is recommended
  const [isMounted, setIsMounted] = useState(false);
  const darkMode = useDarkMode();
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      darkMode.enable();
    } else {
      darkMode.disable();
    }
    setIsMounted(true);
  }, [darkMode]);
  return (
    <DrawerProvider>
      <Script src="noflash.js" />

      {isMounted && <Component {...pageProps} />}
    </DrawerProvider>
  );
}
export default App;
