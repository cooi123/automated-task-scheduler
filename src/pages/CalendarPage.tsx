import React from "react";
const GOOOGLE_CAL_URL = process.env.REACT_APP_GOOGLECALENDAR_URL;
function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        {/* Replace the iframe src with your Google Calendar embed link */}
        <iframe
          src={GOOOGLE_CAL_URL}
          style={{border: 0}}
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}

export default CalendarPage;
