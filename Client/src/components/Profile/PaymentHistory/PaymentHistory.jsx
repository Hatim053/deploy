import React, { useEffect, useState } from "react"
import styles from "./paymenthistory.module.css"

const PaymentHistory = () => {
  const [selected, setSelected] = useState(null)
  const [transactions , setTransactions] = useState([])
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/payment/fetch-transactions` , {
      method : 'GET',
      credentials : 'include',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.transactions)
      setTransactions(data.transactions)
    })
  } , [])

  const openDetails = (txn) => setSelected(txn);
  const closePopup = () => setSelected(null);


  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Last-Transactions</h2>

      
      <div className = {styles['outer-container']}>
        <div className={styles.tableWrapper}>
        <table className={styles.paymentTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {! transactions ? (
    <p className={styles['no-transactions']}>No transaction history yet.</p>
  ) :(transactions.map((txn) => (
              <tr
                key={txn.id}
                className={styles.transactionRow}
                onClick={() => openDetails(txn)}
              >
                <td>{txn.paymentId}</td>
                <td>{txn.amount}</td>
                <td>
                  <span className={`${styles.tag} ${styles[txn.status]}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      </div>

      {selected && (
        <div className={`${styles.detailsPopup} ${styles.show}`}>
          <div className={styles.detailsContent}>
            <span className={styles.closeBtn} onClick={closePopup}>
              &times;
            </span>
            <h3>Transaction Details</h3>
            <div className={styles.details}>
              <p>
                <strong>Transaction ID: </strong> {selected.paymentId}
              </p>
              <p>
                <strong>Amount: </strong> {selected.amount}
              </p>
              <p>
                <strong>Status: </strong> {selected.status}
              </p>
              <p>
                <strong>Date: </strong> {new Date(selected.createdAt).toLocaleString('en-IN',{
                  hour : 'numeric',
                  minute : 'numeric',
                  hour12 : true,
                })}
              </p>
              <p>
                <strong>Mode: </strong> {selected.mode}
              </p>
              <p>
                <strong>Currency: </strong> {selected.currency}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory
