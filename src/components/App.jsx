import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card } from './Card/Card';

import css from './App.module.css';

axios.defaults.baseURL = 'https://644845bde7eb3378ca2b7ea5.mockapi.io/users/';
const CARDS_LIMIT = 3;

export const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const url = new URL('https://PROJECT_TOKEN.mockapi.io/users/1/tasks');
  // console.log(url);
  // url.searchParams.append('title', 'hello');
  // console.log(url);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/users?page=1&limit=${CARDS_LIMIT}`);
        console.log(response);
        console.log(response.data);
        setUsers(response.data);
        setPage(page + 1);
        setIsLoading(false);
        // return response.data;
      } catch (error) {
        // return e.message;
        // console.log(e.message);
        throw new Error(error.message);
      }
    };

    fetchContacts();
    // console.log('opanki');
    // console.log(users);
  }, []);

  return (
    <div className={css.container}>
      {/* <Card /> */}
      {/* <p>{page}</p> */}

      <div className={css.cardset}>
        {users.map(user => (
          <Card key={user.id} />
        ))}
      </div>

      {isLoading ? <p>Loading...</p> : <button className={css.button} type="button">Load more</button>}

      {/* <button type='button'>Load more</button> */}
    </div>
  );
};
