import { getBaseURL } from "@/utils/getBaseURL";

const CurrentBaseUrl = () => {
  return <div className="bg-black p-2">{getBaseURL().href}</div>;
};

export default CurrentBaseUrl;
