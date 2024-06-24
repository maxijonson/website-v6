const baseProperties = [
  "ip",
  "geoip_postal_code",
  "geoip_latitude",
  "geoip_longitude",
  "geoip_city_name",
  "geoip_time_zone",
  "browser_version",
  "os_version",
  "raw_user_agent",
  "screen_width",
  "screen_height",
  "viewport_width",
  "viewport_height",
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
