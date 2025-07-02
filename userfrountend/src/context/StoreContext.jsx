import { createContext,useState } from "react";
//import { food_list } from "../assets/assets"
import axios from 'axios'
import { useEffect } from "react";
export const StoreContext = createContext();

const StoreContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list,setFoodList] = useState([]);
    // Use relative URL for local development; Vite proxy will forward to backend
    const url = 'http://localhost:4000'

    const [token,setToken] = useState("")
    const fetchFoodList = async()=>{
        try {
            const response = await axios.get('/api/food/list');
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }    
        }
        loadData()
    },[])

    const loadCartData = async(token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}})
        setCartItems(response.data.cartData)
    }

    const addToCart = async(itemId) => {
        if(!cartItems[itemId]) 
            setCartItems({...cartItems, [itemId]: 1 })
        else
            setCartItems({...cartItems, [itemId]: cartItems[itemId] + 1 });
        if(token){
            try {
                await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            } catch (error) {
                console.log(error)
            }
        }
  }
  const removeFromCart = async(itemId) => {
        setCartItems({...cartItems, [itemId]: cartItems[itemId] - 1 });
        
        if(token){
            try {
                await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`,{headers:{token}})
            } catch (error) {
                console.log(error)
            }
        }
    }
    const getTotalCartAmount=()=>{
            let total=0;
            for(let item in cartItems){
                if(cartItems[item]>0){
                    let itemInfo = food_list.find(food => food._id === item);
                    if (itemInfo) {
                        total += itemInfo.price * cartItems[item];
                    }
                }
            }
            return total;
    }
    const contextValues={
           food_list,
           cartItems,
           setCartItems,
           removeFromCart,
            addToCart,
            getTotalCartAmount,
            url,
            token,
            setToken
    }
    return(
        <StoreContext.Provider value={contextValues}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider