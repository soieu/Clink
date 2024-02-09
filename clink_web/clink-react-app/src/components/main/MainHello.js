import badgeCode from '../../dataCode/Badge.json';
const MainHello = ({ badge }) => {
  return (
    <>
      <div className="main-hello">
        <div id="badgeName">{badgeCode.BadgeCode[badge.user_badge_code]}</div>
        <div id="userName">{sessionStorage.getItem('nick_name')}님</div>
        <div id="hello">안녕하세요 !</div>
      </div>
    </>
  );
};

export default MainHello;
