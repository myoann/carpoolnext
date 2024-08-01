"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import DatePicker from "react-datepicker";

import { validateCoordinates } from "@/utils";

import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

const todayDate = new Date().toISOString().substring(0, 10);

type FormErrors = {
  date?: string | null;
  fromCoordinate?: string;
  toCoordinate?: string;
};

type ValidateSearchForm = {
  fromCoordinate: FormDataEntryValue | null;
  toCoordinate: FormDataEntryValue | null;
  date: string | null;
};

/** Validate the form fields */
const validateSearchForm = ({
  fromCoordinate,
  toCoordinate,
  date,
}: ValidateSearchForm): FormErrors => {
  const errors: FormErrors = {};

  if (
    typeof fromCoordinate === "string" &&
    !validateCoordinates(fromCoordinate)
  ) {
    errors.fromCoordinate = errors.toCoordinate =
      "Enter a valid coordinate (e.g. 48.864716,2.349014)";
  }

  if (typeof toCoordinate === "string" && !validateCoordinates(toCoordinate)) {
    errors.toCoordinate = "Enter a valid coordinate (e.g. 51.509865,-0.118092)";
  }

  if (typeof date === "string") {
    const selectedDate = new Date(date).toISOString().substring(0, 10);

    if (selectedDate < todayDate) {
      errors.date = "Select a date in the future";
    } else {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      const oneYearFromNowDate = oneYearFromNow.toISOString().substring(0, 10);

      if (selectedDate > oneYearFromNowDate) {
        errors.date = "Select a date within the next year";
      }
    }
  }

  return errors;
};

const SearchForm = () => {
  const [fromCoordinate, setFromCoordinate] = useState("");
  const [toCoordinate, setToCoordinate] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});
    setIsPending(true);

    const date = startDate?.toISOString().substring(0, 10) || null;

    const validationErrors = validateSearchForm({
      fromCoordinate,
      toCoordinate,
      date,
    });

    setIsPending(false);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    window.location.href = `/search?fc=${fromCoordinate}&tc=${toCoordinate}&db=${date}`;
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      aria-label="Search for a carpool"
      className="form"
    >
      <label>
        From coordinate
        <input
          type="text"
          name="fromCoordinate"
          placeholder="Format: latitude,longitude"
          value={fromCoordinate}
          onChange={(event) => setFromCoordinate(event.target.value)}
          required
        />
        {errors.fromCoordinate && (
          <span className="error">{errors.fromCoordinate}</span>
        )}
      </label>

      <label>
        To coordinate
        <input
          type="text"
          name="toCoordinate"
          placeholder="Format: latitude,longitude"
          value={toCoordinate}
          onChange={(event) => setToCoordinate(event.target.value)}
          required
        />
        {errors.toCoordinate && (
          <span className="error">{errors.toCoordinate}</span>
        )}
      </label>

      <label>
        Date
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          popperContainer={({ children }) =>
            createPortal(children, document.body)
          }
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>

      <button type="submit" disabled={isPending} className="submitButton">
        <Image
          src="/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="searchIcon"
        />
      </button>
    </form>
  );
};

export default SearchForm;
