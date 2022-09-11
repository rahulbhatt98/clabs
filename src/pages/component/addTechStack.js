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
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"
import DeleteModal from "../../components/Common/DeleteModal"

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
import Select from "react-select"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  deleteTechStack,
  getTechStack,
  postTechStack,
} from "store/addTechStack/action"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddTechStack = props => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const [techData, setTechData] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [editId, setEditId] = useState(null)
  const [techErr, setTechErr] = useState({})
  const [techUpdateErr, setTechUpdateErr] = useState({})

  const [submit, setSubmit] = useState(false)
  const { orders } = useSelector(state => ({
    orders: state.TechStack?.techStack,
  }))
  // const orders2 = orders.techStack

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
  const optiontech = [
    { value: "1", label: "react js" },
    { value: "2", label: "node js" },
    { value: "3", label: "mern stack" },
  ]

  const optionTech = optiontech?.map(ele => {
    return { value: ele.value, label: ele.label }
  })

  function handleoption(e) {
    setTechData(
      e.map(ele => {
        return ele.value
      })
    )
    setSelectValue(e)
  }
  let arr = []
  console.log("outer arr", arr)
  const handleOrderClick = data => {
    arr = optiontech.filter(ele1 => {
      return data.tech_id.find(x => {
        return x == ele1.value
      })
    })

    console.log(arr, "data123")

    // console.log(arr,"arr123")
    setTechErr(validation(intitalState))
    setEditId(data?.id)
    setOpen(true)
    arr.length > 0 ? setTechData(arr.map(e => e.value)) : setTechData([])
    setSelectValue(arr)

    setDescription(data.description)
    setTitle(data.title)
    setTechErr("")
    setIsEdit(true)
  }

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

  const onClickDelete = data => {
    setOrder(data)
    setDeleteModal(true)
    // dispatch(deleteTechStack(data))
    dispatch(getTechStack())
  }

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(deleteTechStack(order))
      setTimeout(() => {
        dispatch(getTechStack())
      }, "1000")
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }

  const intitalState = {
    id: editId ? editId : "",
    title: title,
    description: description,
    tech_id: techData,
  }

  const AddDataBtn = e => {
    e.preventDefault()
    setSubmit(true)
    setTechErr(validation(intitalState))
    dispatch(getTechStack())
    // arr=[]
    setEditId("")
    setIsEdit(false)
  }

  const handleUpdateTech = e => {
    e.preventDefault()
    setSubmit(true)
    setTechUpdateErr(validationUpdate(intitalState))
    dispatch(getTechStack())
  }
  function validation(val) {
    const err = {}

    if (!val.title) {
      err.title = "This Feild is Required"
    }
    if (!val.tech_id) {
      err.tech_id = "This Feild is Required"
    }
    if (!val.description) {
      err.description = "please write something"
    }
    return err
  }
  function validationUpdate(val) {
    const err = {}

    if (!val.title) {
      err.title = "This Feild is Required"
    }
    if (val.tech_id?.length === 0) {
      err.tech_id = "This Feild is Required"
    }
    if (!val.description) {
      err.description = "please write something"
    }

    return err
  }
  useEffect(() => {
    if (!editId) {
      if (Object.keys(techErr).length == 0 && submit) {
        dispatch(postTechStack(intitalState))
        // setTimeout(() => {
        //   dispatch(getTechStack())
        // }, "1000")
        // dispatch(getTechStack())
        setOpen(false)
      }
    } else {
      if (Object.keys(techUpdateErr).length == 0 && submit) {
        dispatch(postTechStack(intitalState))
        // setTimeout(() => {
        //   dispatch(getTechStack())
        // }, "1000")

        // dispatch(getTechStack())
        setOpen(false)
      }
    }
  }, [techErr, techUpdateErr])

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "title",
      text: "Tech Name",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.title}
        </Link>
      ),
    },
    {
      dataField: "description",
      text: "Short Description",
      sort: true,
    },
    {
      dataField: "updated_at",
      text: "Created at",
      sort: true,
      formatter: (cellContent, row) => handleValidDate(row.updated_at),
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
        ></Badge>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",

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
      // dispatch(onGetOrders())
    dispatch(getTechStack()) 
    setOrderList(orders)
  }, [])


  // useEffect(() => {
  //   if (!isEmpty(orders) && !!isEdit) {
  //     setOrderList(orders)
  //     setIsEdit(false)

  //   }
  // }, [orders])

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

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setEditId("")
    setTitle("")
    setDescription("")
    setTechData("")
    // setSelectValue("")
  }

  const handleClose = () => {
    setOpen(false)
    // setTechData("")
    setDescription("")
    setTitle("")
    setSelectValue("")
    arr = []
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        message="Do you really wants to delete this member ?"
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Add Tech On Project</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Matrics" breadcrumbItem="Add Tech" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders? orders : []}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders ? orders : []}
                        columns={EcommerceOrderColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-flex">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>

                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded   mb-2 me-2"
                                    onClick={handleClickOpen}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New Tech
                                  </Button>
                                </div>
                              </Col>
                              <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>
                                  {" "}
                                  {!editId ? " Add New Tech" : "Edit Tech"}{" "}
                                </DialogTitle>
                                <DialogContent>
                                  <Form onSubmit={AddDataBtn}>
                                    <Row>
                                      <div className="mb-3">
                                        <Label className="control-label">
                                          Title
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Name..."
                                          title="Name"
                                          name="title"
                                          className="form-control"
                                          value={title}
                                          onChange={e =>
                                            setTitle(e.target.value)
                                          }
                                        />
                                        <p className="text-danger">
                                          {!editId
                                            ? techErr.title
                                            : techUpdateErr.title}
                                        </p>
                                      </div>

                                      <div className="mb-3">
                                        <Label className="control-label">
                                          Tech
                                        </Label>
                                        <Select
                                          name="tech_id"
                                          placeholder="Tech"
                                          title="techID"
                                          options={optionTech}
                                          onChange={handleoption}
                                          value={selectValue}
                                          isMulti
                                        />
                                        <p className="text-danger">
                                          {!editId
                                            ? techErr.tech_id
                                            : techUpdateErr.tech_id}
                                        </p>
                                      </div>

                                      <div className="mb-3">
                                        <Label htmlFor="productname">
                                          Description
                                        </Label>
                                        <Input
                                          id="description"
                                          name="description"
                                          type="text"
                                          className="form-control"
                                          value={description}
                                          onChange={e =>
                                            setDescription(e.target.value)
                                          }
                                        />
                                        <p className="text-danger">
                                          {!editId
                                            ? techErr.description
                                            : techUpdateErr.description}
                                        </p>
                                      </div>
                                    </Row>
                                    <div className="d-flex flex-wrap gap-2">
                                      {!editId ? (
                                        <Button
                                          type="submit"
                                          color="primary"
                                          className="btn "
                                        >
                                          Add Tech
                                        </Button>
                                      ) : (
                                        <Button
                                          color="primary"
                                          className="btn "
                                          onClick={handleUpdateTech}
                                        >
                                          Edit Tech
                                        </Button>
                                      )}
                                    </div>
                                  </Form>
                                </DialogContent>
                              </Dialog>
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

AddTechStack.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  deleteTechStack: PropTypes.func,
}

export default withRouter(AddTechStack)
