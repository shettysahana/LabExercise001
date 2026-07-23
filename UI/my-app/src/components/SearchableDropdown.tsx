
import AutocompleteDropdown from './AutocompleteDropdown';
import { countries } from '../data/countries';
import { useCountryCityState } from '../hooks/utils'; 

export default function CountrySelect() {

    const {
        countryValue,
        setCountryValue,
        countryInputValue,
        setCountryInputValue,
        cityValue,
        setCityValue,
        cityInputValue,
        setCityInputValue,
        getFilteredCities
    }
        = useCountryCityState();
    

    return (
        <div>
            {/* Debug: Country Selection Display */}
            <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <strong>Country Value:</strong> {countryValue !== null ? `'${countryValue.label}'` : 'null'}
                <br />
                <strong>Code:</strong> {countryValue !== null ? `'${countryValue.code}'` : 'null'}
                <br />
                <strong>Phone:</strong> {countryValue !== null ? `'${countryValue.phone}'` : 'null'}
                <br />
                <strong>Input Value:</strong> '{countryInputValue}'
            </div>

            {/* Debug: City Selection Display */}
            <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <strong>City Value:</strong> {cityValue !== null ? `'${cityValue.label}'` : 'null'}
                <br />
                <strong>Code:</strong> {cityValue !== null ? `'${cityValue.code}'` : 'null'}
                <br />
                <strong>Phone:</strong> {cityValue !== null ? `'${cityValue.phone}'` : 'null'}
                <br />
                <strong>Input Value:</strong> '{cityInputValue}'
            </div>

            {/* Country Selector */}
            <AutocompleteDropdown 
                elementId="country-select-demo"
                options={countries}
                value={countryValue}
                onChange={(_event, newValue) => {
                    console.log('Selected country:', newValue);
                    setCountryValue(newValue);
                    // Set focus on city input when country is selected
                    if (newValue) {
                        document.getElementById('city-select-demo')?.focus();
                    }
                }}
                inputValue={countryInputValue}
                onInputChange={(_event, newInputValue) => {
                    console.log('Input value changed to:', newInputValue);
                    setCountryInputValue(newInputValue);
                }}
                showFlags={true}
                showPhone={true}
                label="Choose a country"
                noOptionsText="Your Customized No Options Text"
            />

            <div style={{ margin: '1rem 0' }} />

            {/* City Selector */}
            <AutocompleteDropdown
                elementId="city-select-demo"
                options={getFilteredCities(countryValue)}
                value={cityValue}
                onChange={(_event, newValue) => {
                    console.log('Selected city:', newValue);
                    setCityValue(newValue);
                }}
                inputValue={cityInputValue}
                onInputChange={(_event, newInputValue) => {
                    console.log('Input value changed to:', newInputValue);
                    setCityInputValue(newInputValue);
                }}
                label="Choose a city"
                noOptionsText="Your Customized No Options Text"
            />
        </div>
    );
}