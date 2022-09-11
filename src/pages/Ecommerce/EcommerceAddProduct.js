import React, { useState } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import * as Yup from "yup"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"
import { useFormik } from "formik"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useSelector, useDispatch } from "react-redux"
import { postMilestone } from "../../store/addMilestone/action"

const EcommerceAddProduct = () => {
  const [selectedFiles, setselectedFiles] = useState([])
  const [project, setProject] = useState("")
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [sprints, setSprints] = useState("")
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     // name: (order && order.name) || "",
  //     // tm_or_fixed_cost: (order && order.tm_or_fixed_cost) || "True",
  //     // short_description: (order && order.short_description) || "",
  //     deadline: "",
  //     startdate: "",
  //     // tech_stack: (order && order.tech_stack) || "",
  //     // no_of_resource: (order && order.no_of_resource) || "",
  //     // spoc_manager: (order && order.spoc_manager) || "",
  //     // pin_to_dashboard: (order && order.pin_to_dashboard) || "True",

  //     //   orderId: (order && order.orderId) || "",
  //     //   billingName: (order && order.billingName) || "",
  //     //   orderdate: (order && order.orderdate) || "",
  //     //   total: (order && order.total) || "",
  //     //   paymentStatus: (order && order.paymentStatus) || "Paid",
  //     //   badgeclass: (order && order.badgeclass) || "success",
  //     //   paymentMethod: (order && order.paymentMethod) || "Mastercard",
  //   },
  //   validationSchema: Yup.object({
  //     // name: Yup.string().required("Please Enter Your Project Name"),
  //     // tech_stack: Yup.string().required(
  //     //   "Please Enter the technology required for project"
  //     // ),
  //     deadline: Yup.date().required("Please Enter the Deadline"),
  //     startdate: Yup.date().required("Please Enter the Start Date"),
  //     // spoc_manager: Yup.string().required("Please Enter the SPOC/Manager"),
  //     // no_of_resource: Yup.number()
  //     //   .min(1, "Min value 1")
  //     //   .required("Please Enter the No of resources"),
  //     // short_description: Yup.string().required("Please Enter the Description"),
  //     //   orderId: Yup.string().required("Please Enter Your Order Id"),
  //     //   billingName: Yup.string().required("Please Enter Your Billing Name"),
  //     //   orderdate: Yup.string().required("Please Enter Your Order Date"),
  //     //   total: Yup.string().required("Total Amount"),
  //     //   paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
  //     //   badgeclass: Yup.string().required("Please Enter Your Badge Class"),
  //     //   paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
  //   }),
  //   onSubmit: values => {
  //     const newOrder = {
  //       // name: values["name"],
  //       // tm_or_fixed_cost: values["tm_or_fixed_cost"] == "True" ? 1 : 0,
  //       // short_description: values["short_description"],
  //       deadline: values["deadline"],
  //       startdate: values["startdate"],
  //       // tech_stack: values["tech_stack"],
  //       // no_of_resource: values["no_of_resource"],
  //       // spoc_manager: values["spoc_manager"],
  //       // pin_to_dashboard: values["pin_to_dashboard"] == "True" ? 1 : 0,
  //       //   orderId: values["orderId"],
  //       //   billingName: values["billingName"],
  //       //   orderdate: values["orderdate"],
  //       //   total: values["total"],
  //       //   paymentStatus: values["paymentStatus"],
  //       //   paymentMethod: values["paymentMethod"],
  //       //   badgeclass: values["badgeclass"],
  //     }
  //     // save new order
  //     dispatch(onAddNewOrder(newOrder))
  //     validation.resetForm()
  //   },
  // })
  const options = [
    { value: "1", label: "Project1" },
    { value: "2", label: "Project2" },
    { value: "3", label: "Project3" },
    { value: "4", label: "Project4" },
    { value: "5", label: "Project5" },
    { value: "6", label: "Project6" },
  ]

  const dispatch = useDispatch()

  const data = {
    name: name,
    project_id: "1",
    user_id: "2",
    actual_date: startDate,
    release_date: endDate,
    no_of_sprints: sprints,
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("dispatch clicked")
    dispatch(postMilestone(data))
  }
  // function handleAcceptedFiles(files) {
  //   files.map(file =>
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //       formattedSize: formatBytes(file.size),
  //     })
  //   )

  //   setselectedFiles(files)
  // }

  // function formatBytes(bytes, decimals = 2) {
  //   if (bytes === 0) return "0 Bytes"
  //   const k = 1024
  //   const dm = decimals < 0 ? 0 : decimals
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  //   const i = Math.floor(Math.log(bytes) / Math.log(k))
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Creative Labs MileStone</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Milestone" breadcrumbItem="Add Milestone" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Milestone Information</CardTitle>
                  {/* <CardSubtitle className="mb-4">
                    Fill all information below
                  </CardSubtitle> */}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname"> Name</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={name}
                            onChange={e => {
                              setName(e.target.value)
                            }}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Project</Label>
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Country"
                            options={options}
                            onChange={e => setProject(e.label)}
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Deadline</Label>
                          <Input
                            name="endDate"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            // value={orderList.orderdate || ""}
                            // onChange={validation.handleChange}
                            // onBlur={validation.handleBlur}
                            // value={validation.values.deadline || ""}
                            // invalid={
                            //   validation.touched.deadline &&
                            //   validation.errors.deadline
                            //     ? true
                            //     : false
                            // }
                          />
                          {/* {validation.touched.deadline &&
                          validation.errors.deadline ? (
                            <FormFeedback type="invalid">
                              {validation.errors.deadline}
                            </FormFeedback>
                          ) : null} */}
                        </div>

                        {/* <div className="mb-3">
                          <Label htmlFor="manufacturername">
                            Manufacturer Name
                          </Label>
                          <Input
                            id="manufacturername"
                            name="manufacturername"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="manufacturerbrand">
                            Manufacturer Brand
                          </Label>
                          <Input
                            id="manufacturerbrand"
                            name="manufacturerbrand"
                            type="text"
                            className="form-control"
                          />
                        </div> */}
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="price">No of Sprints</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={sprints}
                            onChange={e => setSprints(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Start Date</Label>
                          <Input
                            name="startDate"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            // value={orderList.orderdate || ""}
                            // onChange={validation.handleChange}
                            // onBlur={validation.handleBlur}
                            // value={validation.values.startdate || ""}
                            // invalid={
                            //   validation.touched.startdate &&
                            //   validation.errors.startdate
                            //     ? true
                            //     : false
                            // }
                          />
                          {/* {validation.touched.startdate &&
                          validation.errors.startdate ? (
                            <FormFeedback type="invalid">
                              {validation.errors.startdate}
                            </FormFeedback>
                          ) : null} */}
                        </div>

                        {/* <div className="mb-3">
                          <Label className="control-label">Category</Label>
                          <select className="form-control select2">
                            <option>Select</option>
                            <option value="FA">Fashion</option>
                            <option value="EL">Electronic</option>
                          </select>
                        </div> */}

                        {/* <div className="mb-3">
                          <Label htmlFor="productdesc">
                            Product Description
                          </Label>
                          <textarea
                            className="form-control mb-3"
                            id="productdesc"
                            rows="5"
                          />
                        </div> */}
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Add New Milestone
                      </Button>
                      {/* <Button type="submit" color="secondary" className=" ">
                        Cancel
                      </Button> */}
                    </div>
                  </Form>
                </CardBody>
              </Card>

              {/* <Card>
                <CardBody>
                  <CardTitle className="mb-3">Product Images</CardTitle>
                  <Form>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </Form>
                </CardBody>
              </Card> */}

              {/* <Card>
                <CardBody>
                  <CardTitle>Meta Data</CardTitle>
                  <CardSubtitle className="mb-3">
                    Fill all information below
                  </CardSubtitle>

                  <Form>
                    <Row>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Meta title</Label>
                          <Input
                            id="metatitle"
                            name="productname"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metakeywords">Meta Keywords</Label>
                          <Input
                            id="metakeywords"
                            name="manufacturername"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="metadescription">
                            Meta Description
                          </Label>
                          <textarea
                            className="form-control"
                            id="metadescription"
                            rows="5"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        type="submit"
                        color="primary"
                        className=""
                      >
                        Save Changes
                    </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        className=""
                      >
                        Cancel
                    </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EcommerceAddProduct
