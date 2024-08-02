import React, { createContext, ReactNode, useState } from 'react';

interface ThemeContextTypes {
  formAuth: boolean;
  setFormAuth: (category: boolean) => void;

}

const ThemeContext = createContext<ThemeContextTypes>({
  formAuth: false,
  setFormAuth: () => {},

});

const ThemeProvider = ({ children }: { children: ReactNode }) => {

    
    // true display login form  - false register form
  const [formAuth, setFormAuth] = useState<boolean>(true); 


  return (
    <ThemeContext.Provider
      value={{ formAuth, setFormAuth }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
