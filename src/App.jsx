import { useReducer } from "react";

import { initialState, reducer } from "./utils/reducer";

import ActionAccount from "./components/ActionAccount";
import CardBalance from "./components/CardBalance";
import Header from "./components/Header";
import Main from "./components/Main";
import OperationCards from "./components/OperationCards";
import Transactions from "./components/Transactions";
import TransferCard from "./components/TransferCard";
import CreateAccount from "./components/CreateAccount";
import ActivateAccount from "./components/ActiveAccount";
import AccountEntry from "./components/AccountEntry";

function App() {
  const [{ account, status, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const {
    fullName,
    currency,
    isActive,
    transactions,
    account_number,
    balance,
  } = account || {};
  console.log("APP ACCOUNT:", { account, status, errorMessage });
  return (
    <div className="app">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {status === "entry" && (
        <AccountEntry
          onActivateAccount={() => {
            dispatch({ type: "activateScreen" });
          }}
          onCreateAccount={() => dispatch({ type: "createScreen" })}
        />
      )}

      {status === "create" && (
        <CreateAccount
          onBack={() => dispatch({ type: "entryScreen" })}
          dispatch={dispatch}
        />
      )}

      {status === "activate" && (
        <ActivateAccount
          onBack={() => dispatch({ type: "entryScreen" })}
          dispatch={dispatch}
        />
      )}

      {status === "home" && isActive && (
        <>
          <Header />
          <Main fullName={fullName}>
            <CardBalance
              currency={currency}
              balance={balance}
              fullName={fullName}
              isActive={isActive}
              account_number={account_number}
            />
            <OperationCards dispatch={dispatch} account={account} />
            <TransferCard dispatch={dispatch} account={account} />
            <ActionAccount />
            <Transactions transactions={transactions} />
          </Main>
        </>
      )}
    </div>
  );
}

export default App;
