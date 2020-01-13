import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddSales from './newSale';

const Sales = props => {
  return (
    <section className="app-section">
      {/* <AddSales /> */}
      <div className="label-head">
        <img src="/images/label-head.png" />
        <h4>Order Missing Report</h4>
      </div>
      <div className="row">
        <div class="input-field col s3"></div>
      </div>
      <div className="row">
        <div class="input-field col s12">
          {/* <input
            placeholder="Placeholder"
            id="first_name"
            type="text"
            class="validate"
          />
          <label className="adjusted-label" for="first_name">
            Search Sales
          </label> */}
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>SR.</th>
              <th>Shopkeeper</th>
              <th className="wd-200">Area</th>
              <th>Contact</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {props.data.sales.map((sale, i) => {
              return (
                <tr key={i}>
                  <td>
                    <b>{i + 1}</b>
                  </td>
                  <td>{sale.billNo}</td>
                  <td className="wd-200">
                    {sale.customer.firstName + " " + sale.customer.lastName}
                  </td>
                  <td>{sale.total}</td>
                  <td>{new Date(sale.salesDate).toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default connect(store => {
  return {
    data: store.salesReducer
  };
})(Sales);
