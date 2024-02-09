const MinMaxForm = ({ min, max }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ textAlign: 'left', width: '50%' }}>
        <b>{min}원</b>
      </div>
      <div style={{ textAlign: 'right', width: '50%' }}>
        <b>{max}원</b>
      </div>
    </div>
  );
};
export default MinMaxForm;
