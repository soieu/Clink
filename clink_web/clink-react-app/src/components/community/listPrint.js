import '../../styles/community/listPrint.css';
import PrintPost from './printPost';
function ListPrint({ title, list }) {
  const lists = () => {
    const bestList = [];
    for (let i = 0; i < list.length; i++) {
      bestList.push(<PrintPost i={i} key={i} list={list[i]} />);
    }
    return bestList;
  };
  return (
    <div className="listForm">
      <p className="listTitle">
        <b>{title}</b>
      </p>
      <ol className="list">{lists()}</ol>
    </div>
  );
}
export default ListPrint;
