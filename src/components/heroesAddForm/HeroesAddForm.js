// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  heroesAdd,
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../../actions";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { v4 as uuidv4 } from "uuid";

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { filters } = useSelector((state) => state.filters);

  const Option = (arr) => {
    const options = arr.map((item, i) => {
      if (item.name === "all") return;
      return (
        <option key={i} value={item.name}>
          {item.label}
        </option>
      );
    });
    return <>{options}</>;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        text: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Must be at least 2 letters")
          .required("This field is required"),
        text: Yup.string()
          .min(10, "Must be at least 10 letters")
          .required("This field is required"),
        element: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => {
        const id = uuidv4();
        request(
          `http://localhost:3001/heroes`,
          "POST",
          JSON.stringify({
            id: id,
            name: values.name,
            description: values.text,
            element: values.element,
          })
        )
          .then(() =>
            dispatch(heroesAdd(id, values.name, values.text, values.element))
          )
          .then(() => {
            values.name = "";
            values.text = "";
            values.element = "";
          })
          .catch((error) => console.log(error));
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <ErrorMessage
            style={{ color: "red", marginLeft: "5px" }}
            className="error"
            name="name"
            component="div"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <Field
            required
            name="text"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
            as="textarea"
          />
          <ErrorMessage
            style={{ color: "red" }}
            className="error"
            name="text"
            component="div"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            required
            className="form-select"
            id="element"
            name="element"
            as="select"
          >
            <option>Я владею элементом...</option>
            {Option(filters)}
          </Field>
          <ErrorMessage
            style={{ color: "red" }}
            className="error"
            name="select"
            component="div"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
