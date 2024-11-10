import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [age, setAge] = useState(null);

  const calculateAge = (e) => {
    e.preventDefault();

    if (!birthDate.day || !birthDate.month || !birthDate.year) {
      setAge(null);
      return;
    }

    const today = new Date();
    const birthDateTime = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

    let years = today.getFullYear() - birthDateTime.getFullYear();
    let months = today.getMonth() - birthDateTime.getMonth();
    let days = today.getDate() - birthDateTime.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };

  const handleInputChange = (e, field, value) => {
    setBirthDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl relative">
        <form onSubmit={calculateAge} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold tracking-widest mb-1">DAY</p>
              <input
                type="number"
                min="1"
                max="31"
                value={birthDate.day}
                onChange={(e) => handleInputChange(e, "day", e.target.value)}
                className="w-full p-3 text-2xl font-bold border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="00"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold tracking-widest mb-1">MONTH</p>
              <input
                type="number"
                min="1"
                max="12"
                value={birthDate.month}
                onChange={(e) => handleInputChange(e, "month", e.target.value)}
                className="w-full p-3 text-2xl font-bold border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="00"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold tracking-widest mb-1">YEAR</p>
              <input
                type="number"
                max={new Date().getFullYear()}
                value={birthDate.year}
                onChange={(e) => handleInputChange(e, "year", e.target.value)}
                className="w-full p-3 text-2xl font-bold border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder=""
              />
            </div>
          </div>

          <div className="relative mt-8 flex justify-end">
            <div className="absolute inset-x-0 h-px bg-gray-200 top-1/2"></div>
            <button
              type="submit"
              className="rounded-full bg-purple-600 p-4 hover:bg-black transition-colors duration-200 relative z-10"
            >
              <FaArrowRight color="white" />
            </button>
          </div>
        </form>

        <div className="text-5xl font-extrabold italic">
          <p className="mb-2">
            <span className="text-purple-600">{age?.years ?? "--"}</span>
            <span className="ml-2">years</span>
          </p>
          <p className="mb-2">
            <span className="text-purple-600">{age?.months ?? "--"}</span>
            <span className="ml-2">months</span>
          </p>
          <p>
            <span className="text-purple-600">{age?.days ?? "--"}</span>
            <span className="ml-2">days</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
