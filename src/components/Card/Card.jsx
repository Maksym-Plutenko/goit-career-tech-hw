import { useState } from 'react';
import axios from 'axios';

import css from './Card.module.css';
import logo from './logo.png';
import mainpic from './mainpic.png';
import boypic from './boy.png';
import {formatNumber} from '../../utilites/formatNumber';

axios.defaults.baseURL = 'https://644845bde7eb3378ca2b7ea5.mockapi.io/users';


// const formatNumber = number => {
//   if (number < 1000) {
//     return number;
//   }

//   const thousands = Math.floor(number / 1000);
//   const ones = number.toString().slice(-3);
//   return `${thousands}.${ones}`;
// }

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
      //   const response2 = await axios.put(`/users/${user.id}`, {
      //     followers: 100500,
      //   });
      // console.log(response);
      const newUser = response.data;
      // setFollowed(true);
      // setFollowers(newFollowers);
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
      // console.log(response);
      const newUser = response.data;
      // setFollowed(false);
      // setFollowers(newFollowers);
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
        <img className={css.boy} src={boypic} alt="boy" />
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
