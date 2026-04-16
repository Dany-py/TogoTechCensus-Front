import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

const DateComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
        name='founded'
        className='text-start form-control w-100'
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="Select a date"
    />
  );
};

export default DateComponent;
