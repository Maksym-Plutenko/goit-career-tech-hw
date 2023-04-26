import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card } from './Card/Card';

import css from './App.module.css';

axios.defaults.baseURL = 'https://644845bde7eb3378ca2b7ea5.mockapi.io/users';
const CARDS_LIMIT = 3;

export const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const newPage = page + 1;
      const response = await axios.get(
        `/users?page=${newPage}&limit=${CARDS_LIMIT}`
      );
      const data = response.data;
      if (data.length > 0) {
        const newUsers = [...users, ...data];
        setUsers(newUsers);
        setPage(newPage);
      } else {
        setIsAllLoaded(true);
      }
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const clickHandler = evt => {
    fetchContacts();
  };

  useEffect(() => {
    const fetchContacts2 = async () => {
      try {
        setIsLoading(true);
        const newPage = page + 1;
        const response = await axios.get(
          `/users?page=${newPage}&limit=${CARDS_LIMIT}`
        );
        const data = response.data;
        if (data.length > 0) {
          const newUsers = [...users, ...data];
          setUsers(newUsers);
          setPage(newPage);
        } else {
          setIsAllLoaded(true);
        }
        setIsLoading(false);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchContacts2();
  });

  return (
    <div className={css.container}>
      <div className={css.cardset}>
        {users.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>

      {isLoading ? (
        <p className={css.message}>Loading...</p>
      ) : (
        <>
          {isAllLoaded ? (
            <p className={css.message}>All pages are loaded!</p>
          ) : (
            <button className={css.button} type="button" onClick={clickHandler}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
};
