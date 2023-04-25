import { useState, useEffect } from 'react';
import axios from 'axios';

import {Card} from './Card/Card';

axios.defaults.baseURL='https://644845bde7eb3378ca2b7ea5.mockapi.io/users/';

export const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/users');
        console.log(response);
        console.log(response.data);
        setUsers(response.data);
        // return response.data;
      } catch (error) {
        // return e.message;
        // console.log(e.message);
        throw new Error(error.message);
      }
    }

    fetchContacts();
    // console.log('opanki');
    // console.log(users);
  }, []);

  return (
    <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101'
      // }}
    >
      <Card />
    </div>
  );
};
