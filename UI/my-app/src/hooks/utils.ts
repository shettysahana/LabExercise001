import { useState } from "react";
import { cities } from "../data/cities";
import type { CountryType, CityType } from "../model/inventoryData";

export function useCountryCityState() {
    const [countryValue, setCountryValue] = useState<CountryType | null>(null);
    const [countryInputValue, setCountryInputValue] = useState('');

    const [cityValue, setCityValue] = useState<CityType | null>(null);
    const [cityInputValue, setCityInputValue] = useState('');

    // Pure function to filter cities by country code
    const getFilteredCities = (country: CountryType | null): readonly CityType[] => {
        return country != null ? cities.filter(city => city.countryCode === country.code) : [];
    };

    return {
        countryValue,
        setCountryValue,
        countryInputValue,
        setCountryInputValue,
        cityValue,
        setCityValue,
        cityInputValue,
        setCityInputValue,
        getFilteredCities
    };
}