const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filteredHeroes: [],
  activeFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: [...state.heroes, ...action.payload],
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HEROES_DELETED":
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    case "HEROES_ADDED":
      return {
        ...state,
        heroes: [
          ...state.heroes,
          {
            id: action.id,
            name: action.name,
            description: action.description,
            element: action.element,
          },
        ],
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
      };
    case "FILTRATION":
      return {
        ...state,
        filteredHeroes:
          action.payload === "all"
            ? [...state.heroes]
            : state.heroes.filter((item) => item.element === action.payload),
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

export default reducer;
