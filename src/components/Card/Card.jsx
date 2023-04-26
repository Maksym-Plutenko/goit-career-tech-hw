import { useState } from 'react';
import axios from 'axios';

import css from './Card.module.css';
import logo from './logo.png';
import mainpic from './mainpic.png';
import boypic from './boy.png';

axios.defaults.baseURL = 'https://644845bde7eb3378ca2b7ea5.mockapi.io/users';

const Card = ({ user }) => {
  const [followed, setFollowed] = useState(user.followed);

  const follow = async evt => {
    try {
      const response = await axios.put(`/users/${user.id}`, {
        followed: true,
      });
      //   const response2 = await axios.put(`/users/${user.id}`, {
      //     followers: 100500,
      //   });
      console.log(response);
      setFollowed(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const unfollow = async evt => {
    try {
      const response = await axios.put(`/users/${user.id}`, {
        followed: false,
      });
      console.log(response);
      setFollowed(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} alt="logo" />
      <img
        className={css.marks}
        src={mainpic}
        alt="check mark and question mark"
      />
      <div className={css.middleline}>
        <img className={css.boy} src={boypic} alt="boy" />
      </div>
      <p className={css.tweets}>{user.tweets} tweets</p>
      <p className={css.followers}>{user.followers} followers</p>
      {followed ? (
        <button className={css.following} type="button" onClick={unfollow}>
          following
        </button>
      ) : (
        <button className={css.follow} type="button" onClick={follow}>
          follow
        </button>
      )}
    </div>
  );
};

export { Card };
