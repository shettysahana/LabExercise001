import type { CityType } from "../model/inventoryData";

export const cities: readonly CityType[] = [
    { countryCode: 'AD', code: 'NYC', label: 'New York City', phone: '212' },
    { countryCode: 'AD', code: 'LAX', label: 'Los Angeles', phone: '213' },
    { countryCode: 'AE', code: 'CHI', label: 'Chicago', phone: '312' },
    { countryCode: 'AE', code: 'HOU', label: 'Houston', phone: '713' },
    { countryCode: '', code: '001', label: 'Holding Code', phone: '602' },
];
