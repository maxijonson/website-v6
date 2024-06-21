const baseProperties = [
  "ip",
  "geoip_postal_code",
  "geoip_latitude",
  "geoip_longitude",
  "geoip_city_name",
];

const filteredProperties = baseProperties.reduce<string[]>((acc, property) => {
  return acc.concat(
    `$${property}`,
    `$initial_${property}`,
    `$set.$${property}`,
    `$set.$initial_${property}`,
    `$set_once.$${property}`,
    `$set_once.$initial_${property}`,
  );
}, []);

console.info(`Property filter:\n${filteredProperties.join(",")}`);
