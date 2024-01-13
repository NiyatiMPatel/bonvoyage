import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "./index.css";

//  QueryClient serves as a centralized state manager for managing the state of queries and mutations in application. It is responsible for caching query results, handling background refetching, managing query statuses, and more.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // IF ERROR, REACT-QUERY RETRIES AUTOMATICALLY. USEFUL WHEN SERVER GOES DOWN FOR A WHILE AND IS ACTIVE AGAIN AFTER SOMETIME. BUT DO NOT NEED THAT HERE THEREFORE 0
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* This provider ensures that every component within its scope can access the same queryClient instance without the need to pass it explicitly as a prop through multiple levels */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
