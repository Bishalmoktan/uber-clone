import { useState } from "react";
import { debounce } from "lodash";
import { Label } from "./ui/label";
import { MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { api } from "@/services/authService";

export const LocationInput = ({
  value,
  setValue,
  label,
  id,
}: {
  value: string;
  setValue: (value: string) => void;
  label: string;
  id: string;
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchSuggestions = debounce(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await api.get(`/maps/get-suggestions?input=${query}`);
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchSuggestions(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (location: string) => {
    setValue(location);
    setShowDropdown(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
        <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          placeholder={`Enter ${label.toLowerCase()} address`}
          className="border-0 focus-visible:ring-0"
          value={value}
          onChange={handleChange}
          required
        />
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 w-full bg-white border rounded-md shadow-md mt-1 z-[99999]">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
