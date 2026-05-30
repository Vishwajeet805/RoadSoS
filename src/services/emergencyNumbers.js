// Global emergency numbers by country code
export const emergencyNumbers = {
  IN: { country: "India", police: "100", ambulance: "108", fire: "101", unified: "112" },
  US: { country: "USA", police: "911", ambulance: "911", fire: "911", unified: "911" },
  GB: { country: "UK", police: "999", ambulance: "999", fire: "999", unified: "999" },
  AU: { country: "Australia", police: "000", ambulance: "000", fire: "000", unified: "000" },
  DE: { country: "Germany", police: "110", ambulance: "112", fire: "112", unified: "112" },
  FR: { country: "France", police: "17", ambulance: "15", fire: "18", unified: "112" },
};

export function getNumbersByCountry(countryCode) {
  return emergencyNumbers[countryCode] || emergencyNumbers["IN"];
}
