import React, { useEffect, useState } from "react";
import TiltImage from "../Components/Interactive";
import supabase from "../lib/supabase";
import Notification from "../Components/notification";

export default function JoinWaitlist() {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    evm_address: "",
    email: "",
    discord: "",
    x_handle: "",
    telegram_handle: "",
  });

  const [checkEvm, setCheckEvm] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Notification helpers
  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Authenticate user using service credentials
  const authenticateUser = async () => {
    try {
      const email = import.meta.env.VITE_SUPABASE_USER_EMAIL;
      const password = import.meta.env.VITE_SUPABASE_USER_PASSWORD;

      if (!email || !password) {
        addNotification("error", "Authentication environment variables missing.");
        return;
      }

      let { data, error } = await supabase.auth.signInWithPassword({ email, password });

      // If user doesn't exist, create one
      if (error?.message.includes("Invalid login credentials")) {
        const { error: signupError } = await supabase.auth.signUp({ email, password });
        if (signupError) throw signupError;
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      }

      if (error) throw error;

      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        addNotification("success", "User authenticated successfully!");
      }
    } catch (err) {
      console.error("Authentication error:", err.message);
      addNotification("error", `Authentication failed: ${err.message}`);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authenticated || !user) {
      addNotification("error", "You must be authenticated to join the waitlist.");
      return;
    }

    if (!formData.email || !formData.evm_address) {
      addNotification("error", "Email and EVM Address are mandatory.");
      return;
    }

    try {
      // Check duplicates
      const { data: existing, error: checkError } = await supabase
        .from("waitlist")
        .select("id")
        .or(`email.eq.${formData.email},evm_address.eq.${formData.evm_address}`);

      if (checkError) throw checkError;

      if (existing?.length > 0) {
        addNotification("error", "Email or EVM Address already exists in the waitlist.");
        return;
      }

      // Insert new row
      const { error } = await supabase.from("waitlist").insert([
        {
          evm_address: formData.evm_address,
          email: formData.email,
          discord: formData.discord,
          x_handle: formData.x_handle,
          telegram_handle: formData.telegram_handle,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      addNotification("success", "Successfully joined the waitlist!");
      setFormData({
        evm_address: "",
        email: "",
        discord: "",
        x_handle: "",
        telegram_handle: "",
      });
    } catch (err) {
      console.error("Form submission error:", err.message);
      addNotification("error", `Failed to join waitlist: ${err.message}`);
    }
  };

  const handleCheckEvm = async () => {
    if (!checkEvm) {
      setPopupMessage("Please enter an EVM address to check.");
      setPopupVisible(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("id,email")
        .eq("evm_address", checkEvm);

      if (error) throw error;

      if (data?.length > 0) {
        setPopupMessage(`EVM Address exists in waitlist! Email: ${data[0].email}`);
      } else {
        setPopupMessage("EVM Address not found in waitlist.");
      }

      setPopupVisible(true);
    } catch (err) {
      setPopupMessage(`Error checking EVM address: ${err.message}`);
      setPopupVisible(true);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto min-h-screen px-4 py-10">
        {/* Notifications */}
        <div className="notification-container fixed top-4 right-4 space-y-2">
          {notifications.map((n) => (
            <Notification
              key={n.id}
              type={n.type}
              message={n.message}
              onClose={() => removeNotification(n.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 shadow-[8px_8px_8px_8px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden">
          {/* Left panel */}
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <div className="flex-col items-start gap-2 mb-2">
              <img src="/icons/vanna.svg" alt="Logo" className="w-10 h-10 mb-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-left">Get Early Access!</h2>
            </div>
            <p className="p-3 rounded-lg text-left mt-2 sm:mt-4 mb-6 text-sm sm:text-base leading-none text-purple-500 bg-[#F2ECFE]">
              Just share your real IDs which you use in Galxe quest, or you might get disqualified from the race!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">EVM Address</label>
                <input
                  type="text"
                  name="evm_address"
                  value={formData.evm_address}
                  onChange={handleChange}
                  placeholder="Your EVM Address"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Discord Handle</label>
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="discord.com/@username"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">X Handle</label>
                <input
                  type="text"
                  name="x_handle"
                  value={formData.x_handle}
                  onChange={handleChange}
                  placeholder="x.com/@username"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Telegram Handle</label>
                <input
                  type="text"
                  name="telegram_handle"
                  value={formData.telegram_handle}
                  onChange={handleChange}
                  placeholder="telegram.com/@username"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#F5ABA1] to-[#703AE6] py-3 text-white font-semibold hover:opacity-90 transition"
                disabled={!authenticated}
              >
                Join Waitlist
              </button>
            </form>

            {/* Check EVM */}
            <div className="mb-4 flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Check EVM Address"
                value={checkEvm}
                onChange={(e) => setCheckEvm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              />
              <button
                onClick={handleCheckEvm}
                className="bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700"
              >
                Check
              </button>
            </div>

            {popupVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
                  <p className="mb-4">{popupMessage}</p>
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    onClick={() => setPopupVisible(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right panel */}
          <div className="bg-gray-50 p-6 hidden md:flex justify-center items-center">
            <TiltImage src="/icons/RightPannel.svg" alt="Dashboard Preview" />
          </div>
        </div>
      </div>
    </section>
  );
}
