import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link, useHistory } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import DeleteModal from "../../components/Common/DeleteModal"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Label,
} from "reactstrap"
import Select from "react-select"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

const Dashboard = props => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }))
  const [output, setOutput] = useState([])
  console.log(orders, "output")

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: output.length, // replace later with size(orders),
    custom: true,
  }

  const EcommerceOrderColumns = [
    {
      dataField: "name",
      text: "Project Name",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row?.name}
        </Link>
      ),
    },
    {
      dataField: "tm_or_fixed_cost",
      text: "Fixed Cost",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={
            row?.tm_or_fixed_cost == "1"
              ? "font-size-12 badge-soft-success"
              : "font-size-12 badge-soft-danger"
          }
          color={row?.badgeClass}
          pill
        >
          {row?.tm_or_fixed_cost == "1" ? "true" : "false"}
        </Badge>
      ),
    },
    {
      dataField: "short_description",
      text: "Short Description",
      sort: true,
    },
    {
      dataField: "deadline",
      text: "Deadline",
      sort: true,
      formatter: (cellContent, row) => handleValidDate(row?.deadline),
    },
    {
      dataField: "tech_stack",
      text: "Tech Stack",
      sort: true,
    },
    {
      dataField: "no_of_resource",
      text: "No of resources Planned",
      sort: true,
    },
    {
      dataField: "spoc_manager",
      text: "SPOC/Manager",
      sort: true,
    }
  ]


  var node = useRef()
  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  const handleSearch = e => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    // if (keyword == "") {
    //   dispatch(onGetOrders())
    //   let data = orders.filter(arr => arr.pin_to_dashboard == "1")
    //   setOutput(data)
    // }
    if(keyword.length > 0) {
      dispatch(onGetOrders())
      let data = orders.filter(arr => arr.pin_to_dashboard == "1")
      let out = data.filter(user => {
        return user?.name?.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setOutput(out)
    }
  }, [dispatch, keyword])

  useEffect(() => {
    if (keyword == "") {
    dispatch(onGetOrders())
    let data = orders.filter(arr => arr.pin_to_dashboard == "1")
    setOutput(data)
    }
  }, [])
  

  // useEffect(() => {
  //   if (orders && !orders?.length) {
  //     dispatch(onGetOrders())
  //     let data = orders.filter(arr => arr.pin_to_dashboard == "1")
  //     setOutput(data)
  //   }
  // }, [orders])
  // console.log(output,"output")

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Dashboards"} breadcrumbItem={"Dashboard"} />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns}
                    data={output}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={output}
                        columns={EcommerceOrderColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    {/* <SearchBar {...toolkitProps.searchProps} /> */}
                                    <input
                                      type="text"
                                      value={keyword}
                                      onChange={handleSearch}
                                      placeholder="Search here"
                                    />
                                    {/* <i className="bx bx-search-alt search-icon" /> */}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    // selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
  orders: PropTypes.array,
  result: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(Dashboard)
