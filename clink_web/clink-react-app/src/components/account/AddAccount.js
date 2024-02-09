import React  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddAccount.scss";
import { Link } from "react-router-dom";

const AddAccount = ({ addAccountNo, addAccountBankCode }) => {
  return (
    <div className="addAccount">
      <div className="addAccountConsumptionBox">
        <div className="addAccountLeftBox">
          <div
            className={addAccountNo ? "addAccountTitle1" : "addAccountTitle"}
          >
            저축 계좌
          </div>
          {addAccountNo ? (
            <button className="addAccountEditBtn">
              <Link to="/add-account-update" style={{ textDecoration: "none" }}>
                수정
              </Link>
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="addAccountRightBox">
          <button className="addAccountAddBtn">
            {addAccountNo ? (
              addAccountBankCode + " " + addAccountNo
            ) : (
              <Link to="/add-account-form" style={{ textDecoration: "none" }}>
                + 새 계좌 등록
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
