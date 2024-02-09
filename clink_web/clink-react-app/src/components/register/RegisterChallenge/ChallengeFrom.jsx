import Form from 'react-bootstrap/Form';
import ChalltengeTitleForm from './ChallengeTitleForm';
import ChallengePrice from './ChallengePrice';
import RegisterBtn from '../Common/RegisterBtn';
import { useState } from 'react';

const ChallengeForm = () => {
  const [challenge_title, setChallenge_title] = useState('');
  const [challenge_description, setChallenge_description] = useState('');
  const [challenge_amount, setChallenge_amount] = useState(0);
  return (
    <Form
      className="FromWrap"
      action="http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/challenge/register"
      method="post"
    >
      <ChalltengeTitleForm title={'챌린지 제목'} set={setChallenge_title} />
      <ChalltengeTitleForm title={'나의 다짐'} set={setChallenge_description} />
      <ChallengePrice set={setChallenge_amount} amount={challenge_amount} />
      <div
        className="btnWrap"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <RegisterBtn
          btnType={'등록'}
          title={challenge_title}
          description={challenge_description}
          amount={challenge_amount}
        />
        <RegisterBtn btnType={'취소'} />
      </div>
    </Form>
  );
};
export default ChallengeForm;
