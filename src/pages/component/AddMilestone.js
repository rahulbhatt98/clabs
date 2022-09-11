import React, { useEffect, useState } from "react"
import { useParams, withRouter, Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import BootstrapTable from "react-bootstrap-table-next"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap"
// import Select from "react-select"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useSelector, useDispatch } from "react-redux"
import { getMilestone, postMilestone } from "../../store/addMilestone/action"
import { getProject } from "store/getProject/action"
import * as moment from "moment"

const AddMilestone1 = () => {
  const [projectId, setProjectId] = useState("")
  const [projectInput, setProjectInput] = useState("")
  const [projectParam, setProjectParam] = useState("")
  const [mileStoneName, setMileStoneName] = useState("")
  const [plannedReleaseDate, setPlannedReleaseDate] = useState("")
  const [actualDate, setActualDate] = useState("")
  const [sprints, setSprints] = useState("")
  const [mileStoneErr, setMileStoneErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const params = useParams()

  const GetProject = useSelector(state => state.GetProject)
  const storage = JSON.parse(localStorage.getItem("authUser"))

  // const options = GetProject?.getProject?.map(ele => {
  //   return { value: ele.id, label: ele.name }
  // })

  const getMilestoneBy = useSelector(state => state.Milestone.getMilestone)
  let new1 = getMilestoneBy;

  console.log(getMilestoneBy, "result")

  useEffect(() => {
    setProjectParam(params.id)
    Project()
  }, [GetProject, params])

  function Project() {
    GetProject?.getProject?.map(ele => {
      if (ele.id == projectParam) {
        setProjectInput(ele.name)
      }
    })
  }

  const dispatch = useDispatch()
  // function handleChange(e) {
  //   setProjectId(e.value)
  // }
  const mileStoneData = {
    name: mileStoneName,
    project_id: projectParam ? projectParam : projectId,
    release_date: plannedReleaseDate,
    actual_date: actualDate,
    no_of_sprints: sprints,
    user_id: storage.user_id,
  }

  function handleSubmit(e) {
    e.preventDefault()
    setMileStoneErr(validation(mileStoneData))
    setSubmit(true)
  }

  useEffect(() => {
    dispatch(getMilestone(params?.id))
    new1= getMilestoneBy
  }, [])

  function validation(val) {
    const err = {}

    if (!val.name) {
      err.name = "Please Fill This Feild "
    }
    if (!projectParam) {
      if (!val.project_id) {
        err.project_id = "Please Select Project"
      }
    }
    if (!val.release_date) {
      err.release_date = "Please Fill This Feild"
    }
    return err
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  // let products = [
  //   {
  //     id: 1,
  //     name: "Sourav",
  //     price: 1099,
  //   },
  //   {
  //     id: 2,
  //     name: "Kartik",
  //     price: 2099,
  //   },
  // ]
  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const columns = [
    {
      dataField: "name",
      text: "Milestone Name",
      sort: true,
    },
    {
      dataField: "no_of_sprints",
      text: "Number of Sprints",
      sort: true,
    },
    {
      dataField: "actual_date",
      text: "Start Date",
      formatter: (cellContent, row) => handleValidDate(row?.actual_date),
    },
    {
      dataField: "release_date",
      text: "Release Date",
      formatter: (cellContent, row) => handleValidDate(row?.release_date),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Add Sprint",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, order) => (
        <>
          <div className="d-flex gap-3">
            <Link to={`/add-sprint/${params?.id}/${order?.id}`} className="text-danger">
              <i className="mdi mdi-flag font-size-18" id="sprinttooltip" />
              <UncontrolledTooltip placement="top" target="sprinttooltip">
                Sprint
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]

  useEffect(() => {
    dispatch(getProject())
  }, [])

  useEffect(async() => {
    if (Object.keys(mileStoneErr)?.length == 0 && submit) {
      await dispatch(postMilestone(mileStoneData))
      dispatch(getProject())
      setTimeout(() => {
        dispatch(getMilestone(params?.id))
      }, "1000")
      new1= getMilestoneBy
      setMileStoneName("")
      setPlannedReleaseDate("")
      setActualDate("")
      setSprints("")
    }
  }, [mileStoneErr])

  useEffect(() => {
    dispatch(getProject())
  }, [dispatch])
  

  console.log(plannedReleaseDate, "date")

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Creative Labs MileStone</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Milestone" breadcrumbItem="Add Milestone" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Milestone Information</CardTitle>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Project Name </Label>
                          {/* {projectParam ? ( */}
                          <Input
                            name="endDate"
                            type="text"
                            value={projectInput}
                            readOnly
                          />
                          {/* ) : ( */}
                          {/* <Select
                              classNamePrefix="select2-selection"
                              placeholder="Choose..."
                              title="Country"
                              options={options}
                              onChange={handleChange}
                            /> */}
                          {/* )} */}
                          <p className="text-danger">
                            {mileStoneErr.project_id}
                          </p>
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">
                            Actual Release Date
                          </Label>
                          <Input
                            name="endDate"
                            type="date"
                            value={actualDate}
                            onChange={e => setActualDate(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">No of Sprints</Label>
                          <Input
                            id="sprints"
                            name="sprints"
                            type="number"
                            value={sprints}
                            onChange={e => setSprints(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname"> Name</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={mileStoneName}
                            onChange={e => setMileStoneName(e.target.value)}
                          />
                          <p className="text-danger">{mileStoneErr.name}</p>
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">
                            Planned Released Date
                          </Label>
                          <Input
                            name="startDate"
                            type="date"
                            value={plannedReleaseDate}
                            onChange={e =>
                              setPlannedReleaseDate(e.target.value)
                            }
                          />
                          <p className="text-danger">
                            {mileStoneErr.release_date}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Add New Milestone
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
                          data={getMilestoneBy?.result ? getMilestoneBy?.result : []}
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

export default withRouter(AddMilestone1)
