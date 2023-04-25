import css from './Card.module.css';
import logo from './logo.png';
import mainpic from './mainpic.png';
import boypic from './boy.png';

const Card = () => {
  return (
    <>
    <div className={css.container} >
      <img className={css.logo} src={logo} alt="logo" />
      <img
        className={css.marks}
        src={mainpic}
        alt="check mark and question mark"
      />
      <div className={css.middleline}>
        <img className={css.boy} src={boypic} alt="boy" />
      </div>
      <p className={css.tweets}>tweets</p>
      <p className={css.followers}>followers</p>
      <button className={css.button} type="button">
        follow
      </button>
    </div>
    </>
  );
};

export { Card };
