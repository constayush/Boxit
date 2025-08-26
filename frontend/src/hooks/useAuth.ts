import { useState, useEffect } from "react";
import { fetchMe, loginUser, registerUser } from "../services/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    await loginUser({ username, password });
    const me = await fetchMe();
    setUser(me);
  };

  const register = async (username: string, password: string) => {
    await registerUser({ username, password });
    const me = await fetchMe();
    setUser(me);
  };

  return { user, login, register, loading };
};
