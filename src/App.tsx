import { Router, RootProvider, MainNav } from "@/components";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RootProvider>
        <MainNav />
        <Router />
      </RootProvider>
    </BrowserRouter>
  );
}

export default App;
