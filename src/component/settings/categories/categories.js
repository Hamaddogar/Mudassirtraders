import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCategory from "./addCategory";
import middleware from "../../../store/Middleware/category";
import category from "../../../store/Middleware/category";
import Pagination from "react-js-pagination";
 import './catigories.css'
// const Category = (this.props) => {
class Category extends React.Component {
  // let [addingCategory, showAddCategory] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      targetCategory: {
        name: ""
      },
      openCategoryForm: false
    };
  }

  // toggleStatus = (company) => {

  //     company.status = !company.status;
  //     this.props.toggleState(company);

  // }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  deleteArea = id => {
    let isDelete = window.confirm("Confirm Delete Area");
    if (isDelete) {
      return this.props.deleteArea(id);
    }
  };
  render = () => {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedCategories = this.props.data.categories.slice(
      indexOfFirstitem,
      indexOfLastitem
    );

    return (
      <section className="app-section">
        {this.state.openCategoryForm ? (
          <AddCategory
            category={this.state.targetCategory}
            showAddCategory={() => {
              this.setState({
                openCategoryForm: false,
                targetCategory: {
                  name: ""
                }
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Categories</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              placeholder="Placeholder"
              id="first_name"
              type="text"
              class="validate"
            />
            <label className="adjusted-label" for="first_name">
              Search Companies
            </label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>NAMEjkjkjk</th>
                <th>
                  <img
                    onClick={() => {
                      // showAddCategory(true)
                      this.setState({
                        openCategoryForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {renderedCategories.map((company, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{company.code}</td>
                    <td>{company.name}</td>
                    <td>
                      <img
                        title="Edit"
                        onClick={() => {
                          this.setState({
                            targetCategory: company,
                            openCategoryForm: true
                          });
                        }}
                        className="icon pointer"
                        src="/images/table-icons/edit-icon.png"
                      />
                      <img
                        title="Delete"
                        onClick={() => this.deleteArea(company._id)}
                        className="icon pointer"
                        src="/images/table-icons/del-icon.png"
                      />
                    </td>
                    {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <center>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={renderedCategories.length}
            totalItemsCount={this.props.data.categories.length}
            pageRangeDisplayed={renderedCategories.length}
            onChange={pageNumber => this.handlePageChange(pageNumber)}
          />
        </center>
      </section>
    );
  };
}

export default connect(
  store => {
    return {
      data: store.categoryReducers
    };
  },
  dispatch => {
    return {
      toggleState: args => {
        dispatch(middleware.toggleCompanyState(args));
      },
      deleteArea: areaId => {
        dispatch(middleware.deleteCategory(areaId));
      }
    };
  }
)(Category);
