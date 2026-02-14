import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "\u{1F1EE}\u{1F1F3}", label: "India" },
  { code: "+1", country: "US", flag: "\u{1F1FA}\u{1F1F8}", label: "United States" },
  { code: "+44", country: "GB", flag: "\u{1F1EC}\u{1F1E7}", label: "United Kingdom" },
  { code: "+61", country: "AU", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "+81", country: "JP", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "+49", country: "DE", flag: "\u{1F1E9}\u{1F1EA}", label: "Germany" },
  { code: "+33", country: "FR", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "+86", country: "CN", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
  { code: "+971", country: "AE", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "+966", country: "SA", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi Arabia" },
  { code: "+65", country: "SG", flag: "\u{1F1F8}\u{1F1EC}", label: "Singapore" },
  { code: "+60", country: "MY", flag: "\u{1F1F2}\u{1F1FE}", label: "Malaysia" },
  { code: "+977", country: "NP", flag: "\u{1F1F3}\u{1F1F5}", label: "Nepal" },
  { code: "+94", country: "LK", flag: "\u{1F1F1}\u{1F1F0}", label: "Sri Lanka" },
  { code: "+880", country: "BD", flag: "\u{1F1E7}\u{1F1E9}", label: "Bangladesh" },
  { code: "+92", country: "PK", flag: "\u{1F1F5}\u{1F1F0}", label: "Pakistan" },
  { code: "+55", country: "BR", flag: "\u{1F1E7}\u{1F1F7}", label: "Brazil" },
  { code: "+52", country: "MX", flag: "\u{1F1F2}\u{1F1FD}", label: "Mexico" },
  { code: "+7", country: "RU", flag: "\u{1F1F7}\u{1F1FA}", label: "Russia" },
  { code: "+82", country: "KR", flag: "\u{1F1F0}\u{1F1F7}", label: "South Korea" },
  { code: "+39", country: "IT", flag: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { code: "+34", country: "ES", flag: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { code: "+31", country: "NL", flag: "\u{1F1F3}\u{1F1F1}", label: "Netherlands" },
  { code: "+27", country: "ZA", flag: "\u{1F1FF}\u{1F1E6}", label: "South Africa" },
  { code: "+234", country: "NG", flag: "\u{1F1F3}\u{1F1EC}", label: "Nigeria" },
  { code: "+254", country: "KE", flag: "\u{1F1F0}\u{1F1EA}", label: "Kenya" },
];

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  required?: boolean;
}

export default function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  required,
}: PhoneInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const filteredCountries = search
    ? COUNTRY_CODES.filter(
        (c) =>
          c.label.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search) ||
          c.country.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRY_CODES;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isDropdownOpen]);

  const hasValue = phoneNumber.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-center rounded-[10px] border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 ${
          isFocused ? "ring-2 ring-primary/30" : ""
        }`}
      >
        {/* Country Code Selector */}
        <button
          type="button"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            setSearch("");
          }}
          className="flex items-center gap-2 px-3 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer rounded-l-[10px] shrink-0 self-stretch"
        >
          <span className="text-[18px] leading-none">{selectedCountry.flag}</span>
          <span className="text-[16px] text-[#5a6c75] font-medium leading-none">{selectedCountry.code}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Phone Number Input */}
        <div className="relative flex-1">
          <input
            type="tel"
            className="w-full bg-transparent text-[16px] text-[#5a6c75] placeholder:text-transparent outline-none px-[clamp(12px,2vw,16px)]"
            style={{
              lineHeight: "normal",
              paddingTop: isFloating ? "28px" : "12px",
              paddingBottom: isFloating ? "8px" : "12px",
              transition: "padding 200ms ease",
            }}
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d]/g, "");
              onPhoneNumberChange(val);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
          />
          <label
            className={`absolute left-[clamp(12px,2vw,16px)] pointer-events-none transition-all duration-200 ${
              isFloating
                ? "top-[8px] text-[12px] text-primary"
                : "top-[50%] translate-y-[-50%] text-[16px] text-gray-500"
            }`}
          >
            Phone Number
          </label>
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-[10px] shadow-lg z-50 max-h-[280px] overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-[14px] bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Country List */}
          <div className="overflow-y-auto max-h-[220px]">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-3 text-[14px] text-gray-400 text-center">No results</div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code + country.country}
                  type="button"
                  onClick={() => {
                    onCountryCodeChange(country.code);
                    setIsDropdownOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-[16px] hover:bg-gray-50 transition-colors cursor-pointer ${
                    country.code === countryCode ? "bg-[#E0ECEE]" : ""
                  }`}
                >
                  <span className="text-[18px]">{country.flag}</span>
                  <span className="text-[#304048] flex-1 text-left">{country.label}</span>
                  <span className="text-gray-400 text-[14px]">{country.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
