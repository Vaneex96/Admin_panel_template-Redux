// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeActiveFilter } from "../heroesFilters/filtersSlice";
import classNames from "classnames";

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const onFiltration = (filter) => {
    dispatch(changeActiveFilter(filter));
  };

  useEffect(() => {
    onFiltration(activeFilter);
  }, []);

  const Buttons = (arr) => {
    const buttons = arr.map((button, i) => {
      const btnClass = classNames(button.className, {
        active: button.name === activeFilter,
      });
      return (
        <button
          key={i}
          onClick={() => {
            onFiltration(button.name);
          }}
          className={btnClass}
        >
          {button.label}
        </button>
      );
    });
    return <>{buttons}</>;
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{Buttons(filters)}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
