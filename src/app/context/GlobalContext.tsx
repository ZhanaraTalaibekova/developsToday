"use client";

import { createContext, ReactNode, useState } from "react";

interface Make {
  Make_ID: number;
  Make_Name: string;
}

interface Model {
  Model_ID: number;
  Model_Name: string;
  Make_ID: number;
  Make_Name: string;
}

interface GlobalContextType {
  makeArr: Make[];
  modelArr: Model[];
  getAllModel: (selectedMake: string, selectedYear: string) => Promise<void>;
  getAllMake: () => Promise<void>;
}


export const GlobalContext = createContext<GlobalContextType>({
  makeArr: [],
  modelArr: [],
  getAllModel: async () => { },
  getAllMake: async () => { },
});

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [makeArr, setMakeArr] = useState<Make[]>([]);
  const [modelArr, setModelArr] = useState<Model[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const getAllModel = async (selectedMake: string, selectedYear: string) => {
    try {
      const response = await fetch(
        `${API_URL}/vehicles/getmodelsformakeyear/make/${selectedMake}/modelyear/${selectedYear}?format=json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setModelArr(data?.Results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllMake = async () => {
    try {
      const response = await fetch(
        `${API_URL}/vehicles/getallmakes?format=json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setMakeArr(data?.Results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{ getAllModel, getAllMake, makeArr, modelArr }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
