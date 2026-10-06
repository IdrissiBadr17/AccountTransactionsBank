export const initialState = {
  status: "entry",
  account: {},

  errorMessage: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "entryScreen":
      return {
        ...state,
        status: "entry",
      };

    case "createScreen":
      return {
        ...state,
        status: "create",
      };

    case "activateScreen":
      return {
        ...state,
        status: "activate",
      };

    case "homeScreen":
      return {
        ...state,
        status: "home",
        account: action.payload,
      };

    case "accountUpdated":
      return {
        ...state,
        account: {
          ...action.payload,
          isActive: state.account.isActive,
        },
        errorMessage: "",
      };

    case "deactivate":
      return {
        ...state,
        status: "entry",
        account: {
          ...state.account,
          isActive: false,
        },
      };

    case "operationFailed":
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
