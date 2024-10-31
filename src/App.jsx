import React from "react";
import "./App.css";
import QuizzTest from "./modules/QuizzTest/QuizzTest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Tạo một instance của QueryClient

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Bọc ứng dụng bằng QueryClientProvider */}
      <QuizzTest />
      
    </QueryClientProvider>
  );
}

export default App;
