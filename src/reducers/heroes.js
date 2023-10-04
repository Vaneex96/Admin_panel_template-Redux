const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
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

    default:
      return state;
  }
};

export default heroes;
