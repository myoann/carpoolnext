import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { LatLng } from "@/types";

import "./PlacesAutocomplete.css";

type Props = {
  id: string;
  onCoordinates: (coords: LatLng) => void;
  placeholder: string;
};

const PlacesAutocomplete = ({ id, onCoordinates, placeholder }: Props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      componentRestrictions: {
        // Restrict to France and its neighbors
        country: ["fr", "be", "de", "es", "it", "gb", "ch", "lu", "mc", "ad"],
      },
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        onCoordinates({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        terms,
        structured_formatting: { main_text },
      } = suggestion;

      const country = terms[terms.length - 1].value;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          {main_text}, {country}
        </li>
      );
    });

  return (
    <div className="placesAutocomplete">
      <input
        id={id}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
