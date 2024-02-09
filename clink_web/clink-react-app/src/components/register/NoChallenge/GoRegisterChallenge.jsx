import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPlus } from 'react-icons/bs';
import '../../../styles/AddAccount.scss';
import { Link } from 'react-router-dom';
import '../../../styles/register/GoRegisterChallenge.scss';
const GoRegisterChallenge = () => {
  return (
    <div className="RegisterBox">
      <Link to="/register" className="RegisterBtn">
        <div className="LRadius"></div>
        <b className="RegisterText">
          <h3>
            챌린지 등록하기
            <BsPlus className="RegisterPlusBtn" />
          </h3>
        </b>
        <div className="RRadius"></div>
      </Link>
    </div>
  );
};

export default GoRegisterChallenge;
