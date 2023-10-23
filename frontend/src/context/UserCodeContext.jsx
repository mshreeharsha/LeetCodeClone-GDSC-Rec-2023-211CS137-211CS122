import { useState, useContext, createContext} from "react";

const UserCodeContext = createContext();
const UserCodeContextProvider = ({ children }) => {
  const [code, setCode] = useState('');

  return (
    <UserCodeContext.Provider value={[code, setCode]}>
      {children}
    </UserCodeContext.Provider>
  );
};

// custom hook
const useUserCode = () => useContext(UserCodeContext);

export { useUserCode, UserCodeContextProvider };