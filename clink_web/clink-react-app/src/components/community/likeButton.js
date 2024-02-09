import { BiLike } from '@react-icons/all-files/bi/BiLike';
function LikeButton() {
  const onclick = () => {
    alert('gkdl');
  };
  return (
    <>
      <BiLike onClick={onclick} />
    </>
  );
}
export default LikeButton;
