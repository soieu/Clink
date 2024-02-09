import AddAccount from '../../account/AddAccount';
import ShowAccount from '../../account/ShowAccount';
import Title from '../Common/Title';

const AddAcountForm = () => {
  return (
    <>
      <Title title={'계좌등록'} />
      <AddAccount className="MyPageAddAccount" />
      <ShowAccount className="MyPageAddAccount" />
    </>
  );
};
export default AddAcountForm;
