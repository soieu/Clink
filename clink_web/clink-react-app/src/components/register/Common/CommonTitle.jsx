import { BsPlus } from 'react-icons/bs';
import BackgroundCircle from './BackgroundCircle';

const CommonTitle = ({ children }) => {
  return (
    <div className="RegisterChallengeWrap">
      <BackgroundCircle />
      <h1 className="RegisterTitle">
        새로운 목표
        <BsPlus />
      </h1>
      {children}
    </div>
  );
};
export default CommonTitle;
