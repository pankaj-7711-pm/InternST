import { useState, useEffect, useContext, createContext } from "react";
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
//   useEffect(() => {
//     let existingItem = localStorage.getItem("ud");
//     if (existingItem) setUserData(JSON.parse(existingItem));
//   }, []);
  return (
    <DataContext.Provider value={[userData, setUserData]}>
      {children}
    </DataContext.Provider>
  );
};

//custom hook
const useData = () => useContext(DataContext);

export { useData, DataProvider };
