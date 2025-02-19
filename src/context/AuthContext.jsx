import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supbase";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [info, setInfo] = useState([]);

  const checkRole = async (email) => {
    try {
      const { data, error } = await supabase.rpc("getRole", { email });
      if (error) {
        console.error("Error fetching role:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Unexpected error in checkRole:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          setLoading(false);
          return;
        }

        const currentUser = session?.user || null;
        if (currentUser) {
          const currentRole = await checkRole(currentUser.email);
          setUser(currentUser);
          setRole(currentRole);
          const { data: d, error: e1 } = await supabase
            .from(currentRole === "user" ? "users" : "staff")
            .select("*")
            .eq("email", currentUser.email)
            .single();
          if (e1) {
            console.log(e1);
            return;
          }
          setInfo(d);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signIn = async (email, password, table) => {
    try {
      let user = null;
      let role = null;

      if (table === "users") {
        const { data: userInfo, error: userError } = await supabase
          .from(table)
          .select()
          .eq("email", email)
          .single();
        if (userError || !userInfo) {
          toast.error("کاربر نامعتبر");
          return;
        }
        if (userInfo.status == 2) {
          toast.error("کاربر غیرمحاز");
          return;
        }

        const { data: session, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) {
          toast.error(signInError.message);
          return;
        }

        user = session.user;
        role = "user";
        setInfo(userInfo);
      } else if (table === "staff") {
        const { data: staffInfo, error: staffError } = await supabase
          .from(table)
          .select()
          .eq("email", email)
          .single();
        if (staffError || !staffInfo) {
          toast.error("کاربر نامعتبر");
          return;
        }

        const { data: session, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) {
          toast.error(signInError.message);
          return;
        }

        user = session.user;
        role = staffInfo.role;
        setInfo(staffInfo);
      }

      if (user && role) {
        setUser(user);
        setRole(role);
        toast.success("ورود موفقیت آمیز!");
        return { user, role };
      }
    } catch (error) {
      console.error("Sign-in error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Sign-out error:", error.message);
        return;
      }
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, info, setInfo, signIn, signOut }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
