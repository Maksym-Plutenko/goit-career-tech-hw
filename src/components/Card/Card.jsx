import { useState } from 'react';
import axios from 'axios';

import css from './Card.module.css';
import logo from './logo.png';
import mainpic from './mainpic.png';
import boypic from './boy.png';
import circle from './circle.png';
import { formatNumber } from '../../utilites/formatNumber';

axios.defaults.baseURL = 'https://644845bde7eb3378ca2b7ea5.mockapi.io/users';

const Card = ({ user }) => {
  const [followed, setFollowed] = useState(user.followed);
  const [followers, setFollowers] = useState(user.followers);

  const follow = async evt => {
    try {
      const newFollowers = followers + 1;
      const response = await axios.put(`/users/${user.id}`, {
        followed: true,
        followers: newFollowers,
      });
      const newUser = response.data;
      setFollowed(newUser.followed);
      setFollowers(newUser.followers);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const unfollow = async evt => {
    try {
      const newFollowers = followers - 1;
      const response = await axios.put(`/users/${user.id}`, {
        followed: false,
        followers: newFollowers,
      });
      const newUser = response.data;
      setFollowed(newUser.followed);
      setFollowers(newUser.followers);
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
        <img
          className={css.frontImg}
          src={user.avatar || boypic}
          alt={user.user}
        />
        <img className={css.circle} src={circle} alt="circle" />
      </div>
      <p className={css.tweets}>{user.tweets} tweets</p>
      <p className={css.followers}>{formatNumber(followers)} followers</p>
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
