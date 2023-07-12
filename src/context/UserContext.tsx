import { IUser } from "@services/http/user/types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import apiUser from "@services/http/user/index";

interface UserContextType {
  user: IUser;
  isLoading: boolean;
}

interface UserContextProviderProps {
  children: ReactNode;
}
export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: "",
  });

  async function getUser() {
    const response = await apiUser.getUser();
    if (response?.status === 200) {
      return response.data.message;
    }
  }

  const { data, isLoading } = useQuery("user", getUser, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
