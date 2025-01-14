import axios from "axios";

const customFetch = axios.create({
    baseURL:"https://strapi-store-server.onrender.com/api"
})


export const formatPrice = (price)=>{
    const formattedPriceInDollars = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:'USD'
      }).format((price/100).toFixed(2))
      return formattedPriceInDollars;
}

export const generateArray = (number)=>{
    return(Array.from({length:number},(_,index)=>{
        const amount = index+1;
        return <option key={amount} value={amount}>{amount}</option>
    }))
}

export const selectOptions = (options)=>{
    const optionsTag = options.map(option => {
        return <option key={option} value={option.toLowerCase()}>{option}</option>
    })
    return optionsTag;
}
export default customFetch;