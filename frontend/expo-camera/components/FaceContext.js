import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context object
const MyContext = createContext();

// Create a provider component to manage the context state
const MyContextProvider = ({ children }) => {
   const [search, setSearch] = useState(''); 
   const [showDrawer, setShowDrawer] = useState(false); 
   const [passData, setPassData] = useState([]);
   const [searchPassList , setSearchPassList] = useState('') ;
   const [searchRejectList , setSearchRejectList] = useState('') ; 
   const [rejectData , setRejectData] = useState([]) ;

   // Load passData and rejectData from AsyncStorage on component mount
   useEffect(() => {
       const loadData = async () => {
           try {
               const storedPassData = await AsyncStorage.getItem('passData');
               if (storedPassData) {
                   const parsedPassData = JSON.parse(storedPassData);
                   setPassData(parsedPassData);
               }
               
               const storedRejectData = await AsyncStorage.getItem('rejectData');
               if (storedRejectData) {
                   const parsedRejectData = JSON.parse(storedRejectData);
                   setRejectData(parsedRejectData);
               }
           } catch (error) {
               console.error('Error reading data from AsyncStorage:', error);
           }
       };

       loadData();
   }, []);

   // Save passData and rejectData to AsyncStorage whenever they change
   useEffect(() => {
       const saveData = async () => {
           try {
               await AsyncStorage.setItem('passData', JSON.stringify(passData));
               await AsyncStorage.setItem('rejectData', JSON.stringify(rejectData));
           } catch (error) {
               console.error('Error saving data to AsyncStorage:', error);
           }
       };

       saveData();
   }, [passData, rejectData]);

   return (
       <MyContext.Provider value={{ search, setSearch, showDrawer, setShowDrawer, passData, setPassData , searchPassList , setSearchPassList , searchRejectList , setSearchRejectList , rejectData , setRejectData }}>
           {children}
       </MyContext.Provider>
   );
};

export { MyContext, MyContextProvider };
