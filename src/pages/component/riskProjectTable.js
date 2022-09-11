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
  FormFeedback,
  Label,
} from "reactstrap"

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

const RiskProjectTable = props => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState(null)
  //   console.log(order, "orderrrr")

  // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

    // initialValues: {
    //   name: (order && order.name) || "",
    //   tm_or_fixed_cost: (order && order.tm_or_fixed_cost) || "",
    //   short_description: (order && order.short_description) || "",
    //   deadline: (order && order.deadline) || "",
    //   tech_stack: (order && order.tech_stack) || "",
    //   no_of_resource: (order && order.no_of_resource) || "",
    //   spoc_manager: (order && order.spoc_manager) || "",
    //   pin_to_dashboard: (order && order.pin_to_dashboard) || "",
    // },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Please Enter Your Project Name"),
    //   tech_stack: Yup.string().required(
    //     "Please Enter the technology required for project"
    //   ),
    //   deadline: Yup.string().required("Please Enter the Deadline"),
    //   spoc_manager: Yup.string().required("Please Enter the SPOC/Manager"),
    //   no_of_resource: Yup.number()
    //     .min(1, "Please Enter Atleast 1 resource")
    //     .required("Please Enter the No of resources"),
    //   short_description: Yup.string().required("Please Enter the Description"),
    // }),
    // onSubmit: values => {
    //   console.log(values.deadline, "deadlinesssssssssssssssssssssssss")
    //   console.log(values, "valuessssssssssssssssssssssssssssssssssss")
      //1 === true
      //0 === false
      //   if (isEdit) {
      //     console.log("edittriggered", values, "triggered edittttttttttttttttttt")
      //     const updateOrder = {
      //       id: order ? order.id : 0,
      //       name: values.name,
      //       tm_or_fixed_cost: values.tm_or_fixed_cost == "True" ? 1 : 0,
      //       short_description: values.short_description,
      //       deadline: values.deadline,
      //       tech_stack: values.tech_stack,
      //       no_of_resource: values.no_of_resource,
      //       spoc_manager: values.spoc_manager,
      //       pin_to_dashboard: values.pin_to_dashboard == "True" ? 1 : 0,
      //     }
      //     // update order
      //     dispatch(onUpdateOrder(updateOrder))
      //     validation.resetForm()
      //   } else {
      //     const newOrder = {
      //       name: values["name"],
      //       tm_or_fixed_cost: values["tm_or_fixed_cost"] == "True" ? 1 : 0,
      //       short_description: values["short_description"],
      //       deadline: values["deadline"],
      //       tech_stack: values["tech_stack"],
      //       no_of_resource: values["no_of_resource"],
      //       spoc_manager: values["spoc_manager"],
      //       pin_to_dashboard: values["pin_to_dashboard"] == "True" ? 1 : 0,
      //     }
      //     // save new order
      //     dispatch(onAddNewOrder(newOrder))
      //     validation.resetForm()
      //   }
      // toggle()
  //   },
  // })
  //   const GetProject = useSelector(state => state.GetProject.getProject.result)

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }))

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "name",
      text: "Project Name",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.name}
        </Link>
      ),
    },
    // {
    //   dataField: "tm_or_fixed_cost",
    //   text: "Fixed Cost",
    //   sort: true,
    //   formatter: (cellContent, row) => (
    //     <Badge
    //       className={
    //         row.tm_or_fixed_cost == "1"
    //           ? "font-size-12 badge-soft-success"
    //           : "font-size-12 badge-soft-danger"
    //       }
    //       color={row.badgeClass}
    //       pill
    //     >
    //       {row.tm_or_fixed_cost == "1" ? "True" : "False"}
    //     </Badge>
    //   ),
    // },
    {
      dataField: "short_description",
      text: "Short Description",
      sort: true,
    },
    {
      dataField: "deadline",
      text: "Deadline",
      sort: true,
      formatter: (cellContent, row) => handleValidDate(row.deadline),
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
    },
    {
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={
            row.tm_or_fixed_cost == "1"
              ? "font-size-12 badge-soft-success"
              : "font-size-12 badge-soft-danger"
          }
          color={row.badgeClass}
          pill
        >
         
        </Badge>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, order) => (
        <>
          <div className="d-flex gap-3">
            <Link to={`/add-risk/${order.id}`}
              className="text-success"
            >
              <Button color="danger" className="btn ">
                Add Risk
              </Button>
            </Link>

          </div>
        </>
      ),
    },
  ]
  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders())
    }
  }, [dispatch])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setOrder(null)
    } else {
      setModal(true)
    }
  }
  var node = useRef()
 
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Risk On Project</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Matrics" breadcrumbItem="Add Risk On Project" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders}
                        columns={EcommerceOrderColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
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

RiskProjectTable.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(RiskProjectTable)
 