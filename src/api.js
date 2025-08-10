export const joinWaitlist = async (payload)=>{
    try {
        const DB_URL = import.meta.env.VITE_DB_URL
        if(!DB_URL){throw new Error("Please Provide Correct Database Url")}
        const response = await fetch(`${DB_URL}/api/v1/user/join-waitlist`,{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"           
            }
        })

        const data = await response.json()

        return [data,null]
    } catch (err){
        return [null,err]
    }
}   