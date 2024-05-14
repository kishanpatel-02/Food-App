import axios from "axios";
import { createContext ,useEffect,useState} from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        if(cartItems[itemId]===1){
            const newCartItems = {...cartItems}
            delete newCartItems[itemId]
            setCartItems(newCartItems)
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                const {price} = food_list.find((food)=>food._id===item)
                totalAmount += price*cartItems[item]
            }
        }
        return totalAmount
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            setFoodList(response.data.data)
        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(()=>{

        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        // Add the states and functions here
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return(
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider