// import logo from './logo.svg';
// // import './App.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function App() {
//   const [value, onChange] = useState(new Date());
//   const [slotData, setSlotData] = useState([]);
//   console.log(value, 'value');
//   console.log(slotData, 'slotData');
//   const getData = () => {
//     axios
//       .get(
//         'https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2024-01-30'
//       )
//       .then((res) => {
//         setSlotData(res.data);
//       })
//       .catch((err) => {
//         console.log(err, 'err');
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   var date = new Date(value);

//   // Get the day name, month name, and date using toLocaleDateString()
//   var formattedDate = date.toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//   });

//   // Output the result
//   console.log(formattedDate, 'formattedDate');

//   var date = new Date(value);

//   // Extract year, month, and date components
//   var year = date.getFullYear();
//   var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//   var day = date.getDate().toString().padStart(2, '0');

//   // Form the desired format
//   var formattedDate1 = year + '-' + month + '-' + day;

//   // Output the result
//   console.log(formattedDate1, 'formattedDate1');

//   return (
//     <div className="App">
//       <h1>Hello</h1>
//       <div style={{ alignItems: 'center' }}>
//         <Calendar onChange={onChange} value={value} />
//       </div>
//       <div>
//         {`${formattedDate}- Available Slots`}
//         {slotData.map((data) => {
//           if (formattedDate1 === data.date) {
//             // return <p key={data.date}>{data.date}</p>;
//             {
//               data?.slot?.map((item) => {
//                 console.log(item, 'item');
//               });
//             }
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [value, onChange] = useState(new Date());
  const [slotData, setSlotData] = useState([]);

  const getData = () => {
    axios
      .get(
        'https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2024-01-30'
      )
      .then((res) => {
        setSlotData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  var date = new Date(value);
  var formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var formattedDate1 = `${year}-${month}-${day}`;

  function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <div style={{ alignItems: 'center' }}>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div>
        {formattedDate}- Available Slots
        {slotData.length === 0 ? (
          <p>No slots available</p>
        ) : (
          slotData.map((data) => {
            console.log(data, 'DATA');
            if (formattedDate1 === data.date) {
              return (
                <div key={data.date}>
                  {data?.slots?.map((item, index) => (
                    <p key={index}>
                      {formatTime(item.start_time)} -{' '}
                      {formatTime(item.end_time)}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}

export default App;
