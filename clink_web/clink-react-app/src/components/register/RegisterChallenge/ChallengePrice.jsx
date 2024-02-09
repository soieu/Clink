
import Title from '../Common/Title';
import MinMaxForm from './MinMaxForm';
const ChallengePrice = ({ set, amount }) => {
  const onchange = (e) => {
    set(e.target.value);
  };
  return (
    <>
      <Title title={'목표금액'} />
      <MinMaxForm min={amount} max={50000} />
      <input
        type="range"
        className="range"
        id="price"
        min={0}
        max={50000}
        step={1000}
        onChange={onchange}
        value={amount}
      ></input>
    </>
  );
};
export default ChallengePrice;
