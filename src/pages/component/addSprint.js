import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
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
import { postSprint } from "../../store/addSprint/action"
import { getProject } from "store/getProject/action"
import { getMilestone } from "store/addMilestone/action"
import { listSprint } from "store/addSprint/action"
import BootstrapTable from "react-bootstrap-table-next"
import * as moment from "moment"

const AddSprint = () => {
  const [projectId, setProjectId] = useState("")
  const [mileStoneId, setMileStoneId] = useState("")
  const [name, setName] = useState("")
  const [sprintVelocity, setSprintVelocity] = useState("")
  const [comment, setComment] = useState("")
  const [sprint_capacity, setSprint_capacity] = useState("")
  const [sprintRisk, setSprintRisk] = useState("")
  const [sprintFailRate, setSprintFailRate] = useState("")
  const [sprintSpilling, setSprintSpilling] = useState("")
  const [sprintTicketOpen, setSprintTicketopen] = useState("")
  const [retrospective_finding, setRetrospective_finding] = useState("")
  const [sprintError, setSprintError] = useState({})
  const [submit, setSubmit] = useState(false)
  const [projectInput, setProjectInput] = useState("")
  const [milestoneInput, setMilestoneInput] = useState("")
  const [sprintList, setSprintList] = useState([])
  const [sprintData, setSprintData] = useState([])

  const GetProject = useSelector(state => state?.GetProject)
  const Milestone = useSelector(state => state?.Milestone?.getMilestone?.result)
  const GetSprint = useSelector(state => state?.Sprint?.listsprint?.result)
  const storage = JSON.parse(localStorage.getItem("authUser"))
  const params = useParams()

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const columns = [
    {
      dataField: "name",
      text: "Sprint Name",
      sort: true,
    },
    {
      dataField: "sprint_capacity",
      text: "Sprint Capacity",
      sort: true,
    },
    {
      dataField: "sprint_velocity",
      text: "Sprint Velocity",
      sort: true,
    },
    {
      dataField: "risks",
      text: "Risks",
      sort: true,
    },
    {
      dataField: "retrospective_finding",
      text: "Retrospective Finding",
      sort: true,
    },
    {
      dataField: "tickets_reopen_rate",
      text: "Tickets Reopen Rate",
      sort: true,
    },
    {
      dataField: "pr_fail_rate",
      text: "Pr Fail Rate",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created At",
      formatter: (cellContent, row) => handleValidDate(row?.created_at),
      sort: true,
    },
  ]

  console.log(GetSprint, "sprint")

  console.log(Milestone, "milestoneeee")
  console.log(GetProject, "get project")
  console.log(GetSprint, "get sprint dataaa")

  const stateData = []

  if (projectId) {
    Milestone?.map(ele => {
      if (ele.project_id == projectId) {
        stateData.push(ele)
      }
    })
  }

  // const optionsMileStone = stateData?.map(ele => {
  //   return { value: ele.id, label: ele.name }
  // })

  // const optionProject = GetProject?.getProject?.map(ele => {
  //   return { value: ele.id, label: ele.name }
  // })

  const dispatch = useDispatch()

  const data = {
    name: name,
    user_id: storage.user_id,
    project_id: params?.projectid,
    user_id: storage.user_id,
    milestone_id: params?.milestoneid,
    sprint_capacity: sprint_capacity,
    spilling_to_next_sprint: sprintSpilling,
    sprint_velocity: sprintVelocity,
    tickets_reopen_rate: sprintTicketOpen,
    pr_fail_rate: sprintFailRate,
    risks: sprintRisk,
    comments: comment,
    retrospective_finding: retrospective_finding,
  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log("dispatch clicked")
    setSubmit(true)
    setSprintError(validateSprint(data))
  }

  useEffect(() => {
    Project()
    Milestone1()
    // Sprint()
  }, [GetProject, Milestone, params])

  function Project() {
    GetProject?.getProject?.map(ele => {
      if (ele.id == params?.projectid) {
        setProjectInput(ele.name)
      }
    })
  }

  function Milestone1() {
    Milestone?.map(ele => {
      if (ele.id == params?.milestoneid) {
        setMilestoneInput(ele.name)
      }
    })
  }
  // let sprintResult = []

  // function Sprint() {
  //   // GetSprint?.map(ele => {
  //   //   if(((ele.milestone_id) == (params?.milestoneid)) && ((ele.project_id) == (params?.projectid))){
  //   //     setSprintData([ele])
  //   //     // console.log(ele,"sprint data")
  //   //     sprintResult.push(ele)
  //   //   }
  //   // })
  //   let a =
  //     new1 && new1.filter(x => x.project_id == params?.projectid)
  //   new1 &&
  //     setSprintData(a.filter(x => x.milestone_id == params?.milestoneid))
  // }
  // console.log(sprintResult,"sprint data")

  // function handleChange(e) {
  //   setProjectId(e.value)
  //   dispatch(getMilestone())
  // }
  let new1 = GetSprint;
  useEffect(() => {
    let a = new1 && new1.filter(x => x.project_id == params?.projectid)
  new1 &&
    setSprintData(a.filter(x => x.milestone_id == params?.milestoneid))
  }, [new1])
  

  function validateSprint(val) {
    const err = {}

    if (!val.name) {
      err.name = "Please Fill This Feild"
    }

    if (!val.sprint_capacity) {
      err.sprint_capacity = "Please Fill This Feild"
    }

    if (!val.sprint_velocity) {
      err.sprint_velocity = "Please Fill This Feild"
    }
    if (!val.pr_fail_rate) {
      err.pr_fail_rate = "Please Fill This Feild"
    }
    if (!val.spilling_to_next_sprint) {
      err.spilling_to_next_sprint = "Please Fill This Feild"
    }
    if (!sprintTicketOpen) {
      err.sprintTicketOpen = "Please Fill This Feild"
    }
    if (!sprintFailRate) {
      err.sprintFailRate = "Please Fill This Feild"
    }

    return err
  }
  console.log(sprintError, "ticket ope")

  useEffect(async () => {
    if (Object.keys(sprintError).length == 0 && submit) {
      await dispatch(postSprint(data))
      setTimeout(() => {
        dispatch(listSprint())  
      }, "1000")
      new1=GetSprint
      setName("")
      setSprintVelocity("")
      setComment("")
      setSprint_capacity("")
      setSprintRisk("")
      setSprintFailRate("")
      setSprintSpilling("")
      setRetrospective_finding("")
      setSprintTicketopen("")
    }
  }, [sprintError, submit])

  useEffect(async() => {
    dispatch(getProject())
    dispatch(getMilestone(params?.projectid))
    await dispatch(listSprint())
    new1=GetSprint
  }, [])


  // console.log(sprintList, new1,"data")

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Creative Labs sprint</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Sprint" breadcrumbItem="Add Sprint" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Sprint Information</CardTitle>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Project *</Label>
                          <Input
                            name="projectname"
                            type="text"
                            value={projectInput}
                            readOnly
                          />
                          {/* <Select
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Country"
                            options={optionProject}
                            // onChange={handleChange}
                          /> */}
                          <p className="text-danger">
                            {" "}
                            {sprintError.projectname}
                          </p>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="productname"> Name *</Label>
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
                          <p className="text-danger"> {sprintError.name}</p>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="productname">
                            {" "}
                            Sprint-Capacity *
                          </Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprint_capacity}
                            onChange={e => {
                              setSprint_capacity(e.target.value)
                            }}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.sprint_capacity}
                          </p>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="productname">
                            {" "}
                            Sprint-Velocity *
                          </Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprintVelocity}
                            onChange={e => {
                              setSprintVelocity(e.target.value)
                            }}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.sprint_velocity}
                          </p>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">Sprints Ticket Open *</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprintTicketOpen}
                            onChange={e => setSprintTicketopen(e.target.value)}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.sprintTicketOpen}
                          </p>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="productname"> Description </Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={comment}
                            onChange={e => {
                              setComment(e.target.value)
                            }}
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Milestone *</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={milestoneInput}
                            readOnly
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="price">No of Sprints *</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprintSpilling}
                            onChange={e => setSprintSpilling(e.target.value)}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.spilling_to_next_sprint}
                          </p>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="productname"> Risk</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprintRisk}
                            onChange={e => {
                              setSprintRisk(e.target.value)
                            }}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="productname">
                            Retrospective-Finding
                          </Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={retrospective_finding}
                            onChange={e => {
                              setRetrospective_finding(e.target.value)
                            }}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.retrospective_finding}
                          </p>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="productname"> Per-fail-Rate *</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="number"
                            onKeyDown={evt =>
                              (evt.key === "e" ||
                                evt.key === "-" ||
                                evt.key === "E") &&
                              evt.preventDefault()
                            }
                            value={sprintFailRate}
                            onChange={e => {
                              setSprintFailRate(e.target.value)
                            }}
                            className="form-control"
                          />
                          <p className="text-danger">
                            {" "}
                            {sprintError.sprintFailRate}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Add New Sprint
                      </Button>
                    </div>
                  </Form>

                  <Row className="mt-4">
                    <Col xl="12">
                      <div className="table-responsive">
                        <BootstrapTable
                          keyField="id"
                          responsive
                          bordered={false}
                          striped={false}
                          classes={
                            "table align-middle table-nowrap table-check"
                          }
                          headerWrapperClasses={"table-light"}
                          data={sprintData ? sprintData : []}
                          columns={columns}
                          defaultSorted={defaultSorted}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddSprint
