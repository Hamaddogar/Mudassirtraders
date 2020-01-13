import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddCompany from './addCompany';
import middleware from '../../../store/Middleware/company';
import Pagination from "react-js-pagination";
import './company.css'

// const Company = (this.props) => {
class Company extends React.Component {
      constructor(props)
      {
          super(props)
  this.state = {
        targetCompany: {},
        openCompanyForm: false,
        activePage: 1,
      itemPerPage: 10
    }
      }
    // let [addingCompany, showAddCompany] = useState(false);

    toggleStatus = (company) => {

        company.status = !company.status;
        this.props.toggleState(company);

    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
      }
    render() {
        let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let rendercompanies= this.props.data.companies.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
     console.log("company Components",this.props.data.companies)

        return <section className="app-section">
            {this.state.openCompanyForm ? <AddCompany company = {this.state.targetCompany} showAddCompany={()=>{
                this.setState({
                    targetCompany:{},
                    openCompanyForm:false
                })
            }} /> : null}
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Companies</h4>

                {this.props.data.companies.length !=0?
                <div  className="pagination-setting">

                <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={rendercompanies.length}
              totalItemsCount={this.props.data.companies.length}
              pageRangeDisplayed={rendercompanies.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
                </div>
                :null}
            </div>
            <div className="row">
                <div class="input-field col s3">
                    <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                    <label className="adjusted-label" for="first_name">Search Companies</label>
                </div>
            </div>

            <div>

                <table>
                    <thead>
                        <tr>
                            <th>SR.</th>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th className="wd-200">ADDRESS</th>
                            <th>
                                <img onClick={() => {
                                    this.setState({openCompanyForm:true});
                                }} className="icon add-item" src="/images/add-icon.png" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {rendercompanies.map((company, i) => {
                            return <tr>
                                <td><b>{(i + 1)}</b></td>
                                <td>{company.code}</td>
                                <td>{company.name}</td>
                                <td>{company.phone}</td>
                                <td className="wd-200">{company.address}</td>
                                <td>
                                    <img title="Edit" onClick={() => {
                                        this.setState({
                                            targetCompany: company,
                                            openCompanyForm: true
                                        })
                                    }
                                    } className="icon pointer" src="/images/table-icons/edit-icon.png" />
                                    <button onClick={this.toggleStatus.bind(null, company)} className={company.status ? "control-btn" : "control-btn disabled-btn"}>{company.status ? "Deactivate" : "Activate"}</button></td>
                                {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
            

        </section>
    }

}


export default connect((store) => {
    return {
        data: store.companyReducers
    }
}, (dispatch) => {

    return {
        toggleState: (args) => {

            dispatch(middleware.createCompany(args));


        }
    };

})(Company);