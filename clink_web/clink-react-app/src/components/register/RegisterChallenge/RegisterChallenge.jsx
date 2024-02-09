import ChallengeForm from './ChallengeFrom';
import '../../../styles/register/RegisterChallenge.css';
import CommonTitle from '../Common/CommonTitle';
import AddAcountForm from './AddAcountForm';

const RegisterChallenge = () => {
  return (
    <CommonTitle>
      <AddAcountForm />
      <ChallengeForm />
    </CommonTitle>
  );
};
export default RegisterChallenge;
