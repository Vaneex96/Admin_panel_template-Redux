export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroesDeleted = (id) => {
  return {
    type: "HEROES_DELETED",
    payload: id,
  };
};

export const heroesAdd = (id, name, description, element) => {
  return {
    type: "HEROES_ADDED",
    id,
    name,
    description,
    element,
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtration = (filter) => {
  return {
    type: "FILTRATION",
    payload: filter,
  };
};

export const changeActiveFilter = (filter) => {
  return {
    type: "CHANGE_ACTIVE_FILTER",
    payload: filter,
  };
};
