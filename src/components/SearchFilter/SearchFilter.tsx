import { useDebouncedCallback } from "use-debounce";

import styles from "./SearchFilter.module.scss";
import {
  Carriers,
  FilterBy,
  SearchFilterProps,
  SortBy,
  Transfers,
} from "../../types/types";
import CheckboxField from "./CheckboxField";
import Spinner from "../Spinner/Spinner";

const SearchFilter = ({ filters, setFilters, flights }: SearchFilterProps) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValues: any = e.target.value.split(", ");
    const sortDetails: SortBy = { value: inputValues[0], dir: inputValues[1] };

    setFilters({ ...filters, sortBy: sortDetails });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: Number(e.target.value) });
  };

  const debouncedNumberHandler = useDebouncedCallback(handleNumberChange, 500);

  const renderCheckboxes = (filterBy: FilterBy, filter: Transfers | Carriers) => {
    if (!flights) {
      return <Spinner />;
    }

    const rendered = [];

    for (let property in filter) {
      rendered.push(
        <CheckboxField
          filterBy={filterBy}
          filter={property}
          filters={filters}
          setFilters={setFilters}
          key={property}
        />
      );
    }

    return rendered;
  };

  return (
    <div className={styles.filter}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <p className={styles.title}>Сортировать</p>
          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="price, ASC"
              id="price, ASC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "price" && filters.sortBy.dir === "ASC"}
            />
            <label className={styles.radioLabel} htmlFor="price, ASC">
              по возрастанию цены
            </label>
          </div>

          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="price, DESC"
              id="price, DESC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "price" && filters.sortBy.dir === "DESC"}
            />
            <label className={styles.radioLabel} htmlFor="price, DESC">
              по убыванию цены
            </label>
          </div>

          <div className={styles.input}>
            <input
              type="radio"
              name="sortBy"
              value="time, ASC"
              id="time, ASC"
              onChange={handleRadioChange}
              className={styles.radioInput}
              checked={filters.sortBy.value === "time" && filters.sortBy.dir === "ASC"}
            />
            <label className={styles.radioLabel} htmlFor="time, ASC">
              по времени в пути
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Фильтровать</p>
          {renderCheckboxes("transfers", filters.transfers)}
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Цена</p>
          <div className={styles.input}>
            <label className={styles.priceInputLabel} htmlFor="priceFrom">
              От
            </label>
            <input
              className={styles.priceInput}
              type="text"
              name="priceFrom"
              id="priceFrom"
              defaultValue={filters.priceFrom}
              onChange={debouncedNumberHandler}
            />
          </div>

          <div className={styles.input}>
            <label className={styles.priceInputLabel} htmlFor="priceTo">
              До
            </label>
            <input
              className={styles.priceInput}
              type="text"
              name="priceTo"
              id="priceTo"
              defaultValue={filters.priceTo}
              onChange={debouncedNumberHandler}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.title}>Авиакомпании</p>
          {renderCheckboxes("carriers", filters.carriers)}
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
