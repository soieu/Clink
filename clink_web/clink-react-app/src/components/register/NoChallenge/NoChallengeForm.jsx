import serviceExplain from '../../../assets/serviceE.png';
import CommonTitle from '../Common/CommonTitle';
import GoRegisterChallenge from './GoRegisterChallenge';
const NoChallenge = () => {
  return (
    <CommonTitle>
      <img className="serviceExplain" src={serviceExplain} alt="service" />
      <h3>
        <b>
          나만의 챌린지를 설정하고
          <br />
          일일 챌린지에 도전해 보세요!
        </b>
      </h3>
      <GoRegisterChallenge />
    </CommonTitle>
  );
};
export default NoChallenge;
