import Form from 'react-bootstrap/Form';
import Title from '../Common/Title';

const ChalltengeTitleForm = ({ title, set }) => {
  const onChange = (e) => {
    set(e.target.value);
  };
  return (
    <>
      <Title title={title} />
      <Form.Group className="">
        <Form.Control
          type="text"
          id={title}
          placeholder={title + '을 입력하세요'}
          className="challenge_title"
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};
export default ChalltengeTitleForm;
