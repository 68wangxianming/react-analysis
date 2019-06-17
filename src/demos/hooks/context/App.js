import React, {
  createContext,
  useState,
  useContext,
} from "react";

const TestContext = createContext("default");

const ContextComp = (props, ref) => {
  const context = useContext(TestContext);
  return (
    <p>
      {context} 
    </p>
  );
};

export default function App() {
  const [name, setName] = useState("京程一灯");
  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <TestContext.Provider value={name}>
        <ContextComp />
      </TestContext.Provider>
    </>
  );
}
