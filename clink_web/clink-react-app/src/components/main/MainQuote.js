import QuoteBackgroundImage from "../../images/main_quote.svg";

const MainQuote = ({ quote }) => {
  //console.log(quote);
  return (
    <div className="main-quote">
      <div style={{ padding: 10 }}>
        {quote.quote_content} {"\n\n"} - {quote.quote_author_name} -
      </div>
    </div>
  );
};

export default MainQuote;
