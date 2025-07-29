import axios from "axios";
import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()

    // Fething all products From api
    const fetchAllProduct = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.in/api/products?limit=150')
            const productsData = response.data.products
            setData(productsData)

        } catch (error) {
            console.log(error)
        }
    }


    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((currElem) => {
            return currElem[property]
        })
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = getUniqueCategory(data, "category")
    const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{ data, setData, fetchAllProduct, categoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext.Provider>
}

export const getData = () => useContext(DataContext);

