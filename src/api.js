export const joinWaitlist = async (payload) => {
    const DB_URL = import.meta.env.VITE_DB_URL;
    if (!DB_URL) throw new Error("Please Provide Correct Database Url");
  
    const response = await fetch(`${DB_URL}/api/v1/user/join-waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  
    if (!response.ok) {
      throw new Error(data?.error.message || "Failed to join waitlist");
    }
  

    return data;
  };
  