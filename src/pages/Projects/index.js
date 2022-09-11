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

const EcommerceOrders = props => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState(null)
  const [projectName, setProjectName] = useState("")
  const [fixedCost, setFixedCost] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [techStack, setTechStack] = useState("")
  const [resource, setResource] = useState("")
  const [pinDashboard, setPinDashboard] = useState("")
  const [spocManager, setSpocManager] = useState("")
  const [editId, setEditId] = useState("")
  const [error, setError] = useState({})
  const [submit, setSubmit] = useState(false)
  const [projectId, setProjectId] = useState("")

  const [fixedCostValue, setFixedCostValue] = useState("")
  const [dashboardValue, setDashboardValue] = useState("")
  const [techValue, setTechValue] = useState("")
  const [managerValue, setManagerValue] = useState("")
  const [keyword, setKeyword] = useState("")

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }))
  const [output, setOutput] = useState([])
  console.log(orders, "output")

  const arr = []
  let today = new Date()

  let year = today.getFullYear()
  let month = today.getMonth() + 1 // the months are indexed starting with 0
  let date = today.getDate()

  let dateStr = `${year}-${month <= 9 ? `0${month}` : month}-${
    date <= 9 ? `0${date}` : date
  }`

  const arr2 = []
  const optionfixedCost = [
    { value: "1", label: "True" },
    { value: "0", label: "False" },
  ]
  const optionFixedCost = optionfixedCost.map(ele => {
    arr.push({ value: ele.value, label: ele.label })
    return { value: ele.value, label: ele.label }
  })
  const optionDashboard = [
    { value: "1", label: "True" },
    { value: "0", label: "False" },
  ]

  const optionManager = [
    { value: "0", label: "Manager" },
    { value: "1", label: "Assistant-manager" },
  ]

  const optionTech = [
    { value: "1", label: "react js" },
    { value: "2", label: "node js" },
    { value: "3", label: "mern stack" },
  ]
  const optiontech = optionTech?.map(ele => {
    arr2.push({ value: ele.value, label: ele.label })
    return { value: ele.value, label: ele.label }
  })
  console.log(orders, "project page")
  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: output.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }

  const toLowerCase1 = str => {
    return str === "" || str === undefined ? "" : str.toLowerCase()
  }

  const EcommerceOrderColumns = toggleModal => [
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
    },
    {
      dataField: "pin_to_dashboard",
      text: "Pin To Dashboard",
      sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={
            row?.pin_to_dashboard == "1"
              ? "font-size-12 badge-soft-success"
              : "font-size-12 badge-soft-danger"
          }
          color={row?.badgeClass}
          pill
        >
          {row?.pin_to_dashboard == "1" ? "True" : "False"}
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
            <Link
              to="#"
              className="text-success"
              onClick={() => handleOrderClick(order)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link to={`/add-milestone/${order?.id}`} className="text-danger">
              <i className="mdi mdi-flag font-size-18" id="milestonetooltip" />
              <UncontrolledTooltip placement="top" target="milestonetooltip">
                MileStone
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => onClickDelete(order)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]
  useEffect(() => {
    if (orders && !orders?.length) {
      dispatch(onGetOrders())
      setOutput(orders)
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

  const handleOrderClick = arg => {
    console.log("ARG", arg)
    setIsEdit(true)
    const order = arg
    // setOrder({
    //   id: order?.id,
    //   name: order.name,
    //   tm_or_fixed_cost: order?.tm_or_fixed_cost == 1 ? "true" : "false",
    //   short_description: order?.short_description,
    //   deadline: moment(new Date(order.deadline)).format("YYYY-MM-DD"),
    //   tech_stack: order?.tech_stack,
    //   no_of_resource: order?.no_of_resource,
    //   spoc_manager: order?.spoc_manager,
    //   pin_to_dashboard: order?.pin_to_dashboard,
    // })
    // console.log(order?.tm_or_fixed_cost,"tm")
    setProjectId(order?.id)
    setProjectName(order?.name)
    setResource(order?.no_of_resource)
    setSpocManager(order?.spoc_manager)
    setPinDashboard(order?.pin_to_dashboard)
    setDescription(order?.short_description)
    setDeadline(moment(new Date(order.deadline)).format("YYYY-MM-DD"))
    setTechStack(order?.tech_stack)
    setFixedCost(order?.tm_or_fixed_cost)
    setFixedCostValue(
      order?.tm_or_fixed_cost == 1
        ? { value: "1", label: "True" }
        : { value: "0", label: "False" }
    )
    setDashboardValue(
      order?.pin_to_dashboard == 1
        ? { value: "1", label: "True" }
        : { value: "0", label: "False" }
    )
    setTechValue(order?.tech_stack)
    arr2.map(ele => {
      if (ele.label == order?.tech_stack) {
        setTechValue(ele)
      }
    })
    setManagerValue(
      order?.spoc_manager == "Manager"
        ? { value: "0", label: "Manager" }
        : { value: "1", label: "Assistant-manager" }
    )
    toggle()
  }

  console.log(managerValue, "fff")
  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }
  console.log(editId, "id")
  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = order => {
    setOrder(order)
    setDeleteModal(true)
    dispatch(onGetOrders())
  }

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }
  const handleOrderClicks = () => {
    setIsEdit(false)
    setProjectId("")
    setProjectName("")
    setResource("")
    setSpocManager("")
    setPinDashboard("")
    setDescription("")
    setDeadline("")
    setTechStack("")
    setFixedCost("")
    setTechValue("")
    setEditId("")
    setTechValue("")
    setDashboardValue("")
    setManagerValue("")
    setFixedCostValue("")
    toggle()
  }

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

  const ProjectData = {
    id: projectId ? projectId : "",
    name: projectName,
    tm_or_fixed_cost: fixedCost,
    short_description: description,
    deadline: deadline,
    tech_stack: techStack,
    no_of_resource: resource,
    spoc_manager: spocManager,
    pin_to_dashboard: pinDashboard,
  }
  console.log(ProjectData, "project data")

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmit(true)
    setError(validation(ProjectData))
  }

  function handleOption(e) {
    setFixedCost(e.value)
    setFixedCostValue(e.target)
    console.log(e, "target")
  }

  function validation(val) {
    const err = {}
    if (!isEdit) {
      if (!val.name) {
        err.name = "This Feild is Required"
      }
      if (!val.tm_or_fixed_cost) {
        err.tm_or_fixed_cost = "Please Select This Feild "
      }
      if (!val.short_description) {
        err.short_description = "Write Something"
      }
      // if (!val.deadline) {
      //   err.deadline = "Please Select Date"
      // }
      if (!val.tech_stack) {
        err.tech_stack = "Please Select Tech"
      }
      if (!val.no_of_resource) {
        err.no_of_resource = "Please fill this Feild "
      }
      if (!val.spoc_manager) {
        err.spoc_manager = "Please Select any"
      }
    } else if (isEdit) {
      if (!val.name) {
        err.name = "This Feild is Required"
      }
      if (!val.tm_or_fixed_cost) {
        err.tm_or_fixed_cost = "Please Select This Feild "
      }
      if (!val.short_description) {
        err.short_description = "Write Something"
      }
      if (!val.deadline) {
        err.deadline = "Please Select Date"
      }
      if (!val.tech_stack) {
        err.tech_stack = "Please Select Tech"
      }
      if (!val.no_of_resource) {
        err.no_of_resource = "Please fill this Feild "
      }
      if (!val.spoc_manager) {
        err.spoc_manager = "Please Select any"
      }
    }

    return err
  }

  // useEffect(async() => {
  //   if (Object.keys(error).length == 0 && submit) {
  //     await dispatch(onAddNewOrder(ProjectData))
  //     dispatch(onGetOrders())
  //     console.log("isEdit not1 ")
  //     setModal(false)
  //   }
  // }, [error, submit])
  let out = []
  useEffect(() => {
    if (keyword == "") {
      setOutput(orders)
    }
  }, [orders])
  console.log(output, "out123")
  const handleSearch = async e => {
    setKeyword(e.target.value)

    out = orders.filter(user => {
      return user?.name?.toLowerCase().startsWith(e.target.value.toLowerCase())
    })
    await setOutput(out)
    console.log(out, "result out")
  }

  // useEffect(() => {
  //   dispatch(onGetOrders())
  // }, [])

  useEffect(async () => {
    if (Object.keys(error).length == 0 && submit) {
      await dispatch(onAddNewOrder(ProjectData))

      setModal(false)
      setTimeout(() => {
        dispatch(onGetOrders())
      }, "1000")
    }
  }, [submit, error])

  console.log(techStack, "stack")
  console.log(out, "result")
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
        message="Are you really want to delete this project?"
      />
      <div className="page-content">
        <MetaTags>
          <title>Project</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Matrics" breadcrumbItem="Project" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={output}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={output}
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
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={handleOrderClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New Project
                                  </Button>
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
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Project" : "Add Project"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={handleSubmit}>
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Project Name
                                            </Label>
                                            <Input
                                              name="name"
                                              type="text"
                                              value={projectName}
                                              onChange={e =>
                                                setProjectName(e.target.value)
                                              }
                                            />
                                            <p className="text-danger">
                                              {error.name}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Fixed Cost
                                            </Label>
                                            <Select
                                              options={optionFixedCost}
                                              value={fixedCostValue}
                                              onChange={e => {
                                                handleOption(e)
                                              }}
                                            />
                                            <p className="text-danger">
                                              {error.tm_or_fixed_cost}
                                            </p>
                                          </div>
                                          <div className="mb-3">
                                            <Label htmlFor="short-description">
                                              Short Description
                                            </Label>
                                            <textarea
                                              className="form-control"
                                              id="short_description"
                                              name="short_description"
                                              placeholder="Short Description about project..."
                                              rows="3"
                                              value={description}
                                              onChange={e =>
                                                setDescription(e.target.value)
                                              }
                                            ></textarea>
                                            <p className="text-danger">
                                              {error.short_description}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Deadline
                                            </Label>
                                            <Input
                                              name="deadline"
                                              id="deadline"
                                              type="date"
                                              min={dateStr}
                                              value={deadline}
                                              onChange={e => {
                                                var date = new Date(
                                                  e.target.value
                                                )
                                                var date1 = new Date(dateStr)
                                                // console.log(date.getTime(), date1.getTime(),"e timestamp value")
                                                // console.log(e.target.value, dateStr,"e date value")
                                                if (
                                                  date.getTime() >
                                                  date1.getTime()
                                                )
                                                  setDeadline(e.target.value)
                                              }}
                                            />
                                            <p className="text-danger">
                                              {error.deadline}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Tech Stack
                                            </Label>
                                            <Select
                                              name="tech_stack"
                                              options={optiontech}
                                              value={techValue}
                                              onChange={e => {
                                                setTechStack(e.label)
                                                setTechValue(e.target)
                                              }}
                                            />

                                            <p className="text-danger">
                                              {error.tech_stack}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              No of Resources Planned
                                            </Label>
                                            <Input
                                              name="no_of_resource"
                                              type="number"
                                              value={resource}
                                              onKeyDown={evt =>
                                                (evt.key === "e" ||
                                                  evt.key === "-" ||
                                                  evt.key === "E") &&
                                                evt.preventDefault()
                                              }
                                              onChange={e =>
                                                setResource(e.target.value)
                                              }
                                            />
                                            <p className="text-danger">
                                              {error.no_of_resource}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              SPOC/Manager
                                            </Label>
                                            <Select
                                              name="spoc_manager"
                                              options={optionManager}
                                              value={managerValue}
                                              onChange={e => {
                                                setSpocManager(e.label)
                                                setManagerValue(e.target)
                                              }}
                                            />
                                            <p className="text-danger">
                                              {error.spoc_manager}
                                            </p>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Pin to Dashboard
                                            </Label>
                                            <Select
                                              name="pin_to_dashboard"
                                              options={optionDashboard}
                                              value={dashboardValue}
                                              onChange={e => {
                                                setPinDashboard(e.value)
                                                setDashboardValue(e.target)
                                              }}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </ModalBody>
                                </Modal>
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

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  result: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

export default withRouter(EcommerceOrders)
