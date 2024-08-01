"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import DatePicker from "react-datepicker";

import { LatLng } from "@/types";

import PlacesAutocomplete from "./PlacesAutocomplete";

import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

const todayDate = new Date().toISOString().substring(0, 10);

type FormErrors = {
  date?: string;
  fromCoordinate?: string;
  toCoordinate?: string;
};

type ValidateSearchForm = {
  fromCoordinate: LatLng | null;
  toCoordinate: LatLng | null;
  date: string | null;
};

/** Validate the form fields */
const validateSearchForm = ({
  fromCoordinate,
  toCoordinate,
  date,
}: ValidateSearchForm): FormErrors => {
  const errors: FormErrors = {};

  if (!fromCoordinate) {
    errors.fromCoordinate = "Enter a valid place";
  }

  if (!toCoordinate) {
    errors.toCoordinate = "Enter a valid place";
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
  const [fromCoordinate, setFromCoordinate] = useState<LatLng | null>(null);
  const [toCoordinate, setToCoordinate] = useState<LatLng | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFromCoordinates = (coords: LatLng) => {
    setFromCoordinate(coords);
  };

  const handleToCoordinates = (coords: LatLng) => {
    setToCoordinate(coords);
  };

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

    window.location.href = `/search?fc=${fromCoordinate?.lat},${fromCoordinate?.lng}&tc=${toCoordinate?.lat},${toCoordinate?.lng}&db=${date}`;
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      aria-label="Search for a carpool"
      className="form"
    >
      <label>
        From coordinate
        <PlacesAutocomplete
          onCoordinates={handleFromCoordinates}
          placeholder="Enter a departure place"
        />
        {errors.fromCoordinate && (
          <span className="error">{errors.fromCoordinate}</span>
        )}
      </label>

      <label>
        To coordinate
        <PlacesAutocomplete
          onCoordinates={handleToCoordinates}
          placeholder="Enter a destination place"
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
          popperContainer={({ children }) => {
            if (typeof document !== "undefined") {
              return createPortal(children, document.body);
            }
            return null;
          }}
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
