const initialState = {
  filtersLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "CHANGE_ACTIVE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
