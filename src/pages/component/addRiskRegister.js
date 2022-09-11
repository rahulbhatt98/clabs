import React, { useEffect, useRef, useState } from "react"
import { NavLink, Link, useParams } from "react-router-dom"
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
  UncontrolledTooltip,
} from "reactstrap"
import Select from "react-select"

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import images
import img1 from "../../assets/images/small/img-2.jpg"
import avtar1 from "../../assets/images/users/avatar-2.jpg"
import  {AiFillLike}  from "react-icons/ai";
import  {AiOutlineDislike}  from "react-icons/ai";


import { useSelector, useDispatch } from "react-redux"
import { postRisk } from "../../store/addRiskRegister/action"
import { getProject } from "store/getProject/action"
import classNames from "classnames"
import { getMilestone } from "store/addMilestone/action"
import { listSprint } from "store/addSprint/action"
import moment from "moment"
import { CommentLike, getComment, getCommentSuccess, postComment } from "store/addComment/action"
import parse from 'html-react-parser';
// import { AiOutlineLike } from "react-icons/Ai";
import LikeButton from "../../assets/icons/likeButton.svg"
import dislikeButton from "../../assets/icons/dislikeButton.svg"

const RiskRegister = () => {

  const [projectId, setProjectId] = useState("")
  const [comment, setComment] = useState("")
  const [mileStoneId, setMileStoneId] = useState("")
  const [sprintsId, setSprintsId] = useState("")
  const [periodType, setPeriodType] = useState("Project")
  const [paramsId, setParamsId] = useState("")
  const [projectDate, setProjectDate] = useState("")
  const [commentData, setCommentData] = useState("")
  const [commentMileStoneId, setCommentMileStoneId] = useState("")
  const [commentSprintsId, setCommentSprintsId] = useState("")
  const [riskError, setRiskError] = useState({})
  const [riskMileStoneError, setRiskMileStoneError] = useState({})
  const [riskSprintError, setRiskSprintError] = useState({})
  const [commentRiskError, setCommentRiskError] = useState({})
  const [commentRiskMileStoneError, setCommentRiskMileStoneError] = useState({})
  const [commentRiskSprintError, setCommentRiskSprintError] = useState({})
  const [submit, setSubmit] = useState(false)
  const [projectMitigationPlan, setProjectMitigationPlan] = useState("")
  const [mileStoneMitigationPlan, setMileStoneMitigationPlan] = useState("")
  const [sprintMitigationPlan, setSprintMitigationPlan] = useState("")
  const [projectContigencyPlan, setProjectContigencyPlan] = useState("")
  const [mileStoneContigencyPlan, setMileStoneContigencyPlan] = useState("")
  const [sprintContigencyPlan, setSprintContigencyPlan] = useState("")
  const [milestoneDescription, setMilestoneDescription] = useState("")
  const [sprintDescription, setSprintDescription] = useState("")
  const [optionsMileStone, setOptionMilestone] = useState("")
  const [optionsSprint, setOptionSprint] = useState("")
  const [optionsCommentMileStone, setOptionCommentMilestone] = useState("")
  const [optionsCommentSprint, setOptionCommentSprint] = useState("")



  const GetProject = useSelector(state => state.GetProject)
  const Milestone = useSelector(state => state.Milestone.getMilestone)
  const GetSprint = useSelector(state => state.Sprint.listsprint)
  const GetComment = useSelector(state => state.Comment)
  const dispatch = useDispatch()

  let arrayProject = []

  useEffect(() => {
    dispatch(getProject())
    dispatch(getComment())
  }, [])

  const storage = JSON.parse(localStorage.getItem("authUser"))
  const param = useParams()

  useEffect(() => {
    setParamsId(param.id)
    Project()
  }, [GetProject, param])

  const data = {
    project_id: periodType == "Project" ? paramsId : "",
    milestone_id: mileStoneId,
    sprint_id: sprintsId,
    status: "1",
    user_id: storage.user_id,
    contigency_plan: periodType == "Project" ? projectContigencyPlan : periodType == "Milestone" ? mileStoneContigencyPlan : periodType == "Sprint" ? sprintContigencyPlan : "",
    description: periodType == "Project" ? comment : periodType == "Milestone" ? milestoneDescription : periodType == "Sprint" ? sprintDescription : "",
    mitigation_plan: periodType == "Project" ? projectMitigationPlan : periodType == "Milestone" ? mileStoneMitigationPlan : periodType == "Sprint" ? sprintMitigationPlan : "",
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (periodType == "Project") {
      setRiskError(validationRisk(data))
    }
    if (periodType === "Milestone") {
      setRiskMileStoneError(validationRisk(data))
    }
    if (periodType == "Sprint") {
      setRiskSprintError(validationRisk(data))
    }
    setSubmit(true)
  }
  useEffect(() => {
    if (periodType === "Milestone") {
      dispatch(getMilestone(paramsId))
    } else if (periodType === "Sprint") {
      dispatch(listSprint())
    } else if (periodType === "Project") {
      dispatch(getProject())
    }
  }, [periodType])

  function Project() {
    GetProject?.getProject?.map(ele => {
      if (ele.id == paramsId) {
        setProjectId(ele.name)
        setProjectDate(ele.created_at)
      }
    })
  }
  const onChangeChartPeriod = data => {
    setPeriodType(data)
  }

  const stateData = []
  const stateDataSprint = []
  const mileStoneUpdate = []
  const commentMileStoneUpdate = []
  let commentSprintUpdate = [];
  let sprintUpdate = []

  if (paramsId) {
    Milestone?.result?.map(ele => {
      if (ele.project_id == paramsId) {
        stateData.push(ele)
      }
      if (ele.id == mileStoneId) {
        mileStoneUpdate.push(moment(ele.created_at).format("DD-MM-YYYY"))
      }
      if (ele.id == commentMileStoneId) {
        commentMileStoneUpdate.push(moment(ele.created_at).format("DD-MM-YYYY"))
      }
    })
  }
  if (paramsId) {
    GetSprint?.result?.map(ele => {
      stateData.map((ele1) => {
        if (ele.milestone_id == ele1.id) {
          stateDataSprint.push(ele)
        }
        if (ele.id == sprintsId) {
          sprintUpdate = moment(ele.created_at).format("DD-MM-YYYY")
        }
        if (ele.id == commentSprintsId) {
          commentSprintUpdate = moment(ele.created_at).format("DD-MM-YYYY")
        }
      })
    })
  }
  if (periodType === "Milestone") {
    arrayProject.push(stateData)
  } else if (periodType === "Sprint") {
    arrayProject.push(stateDataSprint)
  }
  const optionProject = arrayProject[0]?.map(ele => {
    return { value: ele.id, label: ele.name }
  })

  function handleProjectChange(e) {
    if (periodType === "Milestone") {
      setMileStoneId(e.value)
      setOptionMilestone(e.target)
      setOptionSprint("")
      setProjectId("")
      setSprintsId("")
    }

    if (periodType === "Sprint") {
      setSprintsId(e.value)
      setProjectId("")
      setMileStoneId("")
      setOptionSprint(e.target)
      setOptionMilestone("")

    }
    if (periodType == "Project") {
      setMileStoneId("")
      setOptionSprint("")
      setOptionMilestone("")
      setOptionSprint("")
      setSprintsId("")
    }
  }
  function handleProjectComment(e) {
    if (periodType === "Milestone") {
      setCommentMileStoneId(e.value)
      setProjectId("")
      setOptionCommentMilestone(e.target)
      setOptionCommentSprint("")
      setCommentSprintsId("")
    }
    else if (periodType === "Sprint") {
      setCommentSprintsId(e.value)
      setProjectId("")
      setOptionCommentSprint(e.target)
      setOptionCommentMilestone("")
      setCommentMileStoneId("")
    }
  }
  const postCommentData = {
    title: projectId,
    description: commentData,
    milestone_id: commentMileStoneId,
    project_id: periodType == "Project" ? paramsId : "",
    risk_id: "",
    sprint_id: commentSprintsId
  }
  const CommentPost = (e) => {
    if (periodType == "Project") {
      setCommentRiskError(validationCommentRisk(postCommentData))

    }
    if (periodType === "Milestone") {
      setCommentRiskMileStoneError(validationCommentRisk(postCommentData))
    }
    if (periodType == "Sprint") {
      setCommentRiskSprintError(validationCommentRisk(postCommentData))
    }
    setSubmit(true)
    dispatch(getComment())
  }
  const CommentFilterData = [];
  const CommentMileStoneData = [];
  const CommentSprintData = [];

  if (paramsId) {
    GetComment?.getComment?.map((ele) => {
      if (ele.project_id == paramsId) {
        CommentFilterData.push(ele)
      }
      stateData.map((ele2) => {
        if (ele.milestone_id == ele2.id) {
          CommentMileStoneData.push(ele)
        }
      })
      stateDataSprint.map((ele2) => {
        if (ele.sprint_id == ele2.id) {
          CommentSprintData.push(ele)
        }
      })
    })
  }
  const likeButton = (id) => {
    const likeCommentData = {
      comment_id: id,
      user_id: storage.user_id,
      flag: "1"
    }
    dispatch(CommentLike(likeCommentData))
    dispatch(getComment())
  }
  const DislikeButton = (id) => {
    const likeCommentData = {
      comment_id: id,
      user_id: storage.user_id,
      flag: "0"
    }
    dispatch(CommentLike(likeCommentData))
    dispatch(getComment())
  }
  function validationRisk(val) {
    const err = {};
    if (periodType === "Project") {
      setRiskMileStoneError("")
      setRiskSprintError("")
      if (!val.contigency_plan) {
        err.contigency_plan = "Please fill this  feild "
      }
      if (!val.mitigation_plan) {
        err.mitigation_plan = "Please fill this  feild "
      }
    }
    if (periodType === "Milestone") {
      setRiskError("")
      setRiskSprintError("")
      if (!val.contigency_plan) {
        err.contigency_plan = "Please fill this  feild "
      }
      if (!val.mitigation_plan) {
        err.mitigation_plan = "Please fill this  feild "
      }
      if (!val.milestone_id) {
        err.milestone_id = "Please Select MileStone"
      }
    }
    if (periodType === "Sprint") {
      setRiskMileStoneError("")
      setRiskError("")
      if (!val.contigency_plan) {
        err.contigency_plan = "Please fill this  feild "
      }
      if (!val.mitigation_plan) {
        err.mitigation_plan = "Please fill this  feild "
      }
      if (!val.sprint_id) {
        err.sprint_id = "Please Select Sprint"
      }
    }
    return err;
  }
  useEffect(() => {
    if (periodType == "Project") {
      if (Object.keys(riskError).length == 0 && submit) {
        dispatch(postRisk(data))
      }
    }
    if (periodType == "Milestone") {
      if (Object.keys(riskMileStoneError).length == 0 && submit) {
        dispatch(postRisk(data))
      }
    }
    if (periodType == "Sprint") {
      if (Object.keys(riskSprintError).length == 0 && submit) {
        dispatch(postRisk(data))
      }
    }
  }, [riskError, riskMileStoneError, riskSprintError])

  function validationCommentRisk(val) {
    const err = {}
    if (periodType === "Project") {
      setCommentRiskMileStoneError("")
      setCommentRiskSprintError("")
      if (!val.description) {
        err.description = "Please Write Description "
      }
    }
    if (periodType === "Milestone") {
      setCommentRiskError("")
      setCommentRiskSprintError("")
      if (!val.description) {
        err.description = "Please Write Description "
      }
      if (!val.milestone_id) {
        err.milestone_id = "Please Select MileStone"
      }
    }
    if (periodType === "Sprint") {
      setCommentRiskMileStoneError("")
      setCommentRiskError("")
      if (!val.description) {
        err.description = "Please Write Description "
      }
      if (!val.sprint_id) {
        err.sprint_id = "Please Select Sprint"
      }
    }
    return err;
  }
  useEffect(() => {
    if (periodType == "Project") {
      if (Object.keys(commentRiskError).length == 0 && submit) {
        console.log("dis[qa")
        dispatch(postComment(postCommentData))
        dispatch(getComment())
      }
    }
    if (periodType == "Milestone") {
      if (Object.keys(commentRiskMileStoneError).length == 0 && submit) {
        dispatch(postComment(postCommentData))
        dispatch(getComment())
      }
    }
    if (periodType == "Sprint") {
      if (Object.keys(commentRiskSprintError).length == 0 && submit) {
        dispatch(postComment(postCommentData))
        dispatch(getComment())
      }
    }
  }, [commentRiskError, commentRiskMileStoneError, commentRiskSprintError])


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Creative Labs Risk-Register</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Risk-Register"
            breadcrumbItem="Add Comments"
          />
          <Card>
            <CardBody>
              <div className="d-sm-flex flex-wrap">
                <div className="ms-auto">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <Link
                        to="#"
                        id="one_month"
                        className={classNames(
                          { active: periodType === "Project" },
                          "nav-link"
                        )}
                        onClick={() => {
                          onChangeChartPeriod("Project")
                        }}
                      >
                        Project
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        className={classNames(
                          { active: periodType === "Milestone" },
                          "nav-link"
                        )}
                        id="one_month"
                        onClick={() => {
                          onChangeChartPeriod("Milestone")
                        }}
                      >
                        Milestone
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        id="one_month"
                        className={classNames(
                          { active: periodType === "Sprint" },
                          "nav-link"
                        )}
                        onClick={() => {
                          onChangeChartPeriod("Sprint")
                        }}
                      >
                        Sprint
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Risk Register Information</CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">
                            {periodType} Name
                          </Label>
                          {periodType === "Project" ? (
                            <Input
                              name="endDate"
                              type="text"
                              value={projectId}
                              readOnly
                            />
                          ) : periodType == "Milestone" ? (<>
                            <Select
                              placeholder="Choose..."
                              title="Country"
                              options={optionProject}
                              value={optionsMileStone}
                              onChange={handleProjectChange}
                            />
                            <p className="text-danger">{riskMileStoneError.milestone_id}</p>
                          </>
                          )
                            : periodType == "Sprint" ? <>
                              <Select
                                placeholder="Choose..."
                                title="Country"
                                options={optionProject}
                                value={optionsSprint}
                                onChange={handleProjectChange}
                              />
                              <p className="text-danger">{riskSprintError.sprint_id}</p>
                            </> : ""}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">Contigency Plan</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={periodType == "Project" ? projectContigencyPlan : periodType == "Milestone" ? mileStoneContigencyPlan : periodType == "Sprint" ? sprintContigencyPlan : ""}
                            onChange={
                              (e) => {
                                if (periodType == "Project") { setProjectContigencyPlan(e.target.value) }
                                if (periodType == "Milestone") { setMileStoneContigencyPlan(e.target.value) }
                                if (periodType == "Sprint") { setSprintContigencyPlan(e.target.value) }
                              }
                            }
                            className="form-control"
                          />
                          <p className="text-danger"> {periodType == "Project" ? riskError.contigency_plan :
                            periodType == "Milestone" ? riskMileStoneError.contigency_plan
                              : periodType === "Sprint" ? riskSprintError.contigency_plan : ""}   </p>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">Description</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={periodType == "Project" ? comment : periodType == "Milestone" ? milestoneDescription : periodType == "Sprint" ? sprintDescription : ""}
                            onChange={
                              (e) => {
                                if (periodType == "Project") { setComment(e.target.value) }
                                if (periodType == "Milestone") { setMilestoneDescription(e.target.value) }
                                if (periodType == "Sprint") { setSprintDescription(e.target.value) }
                              }
                            }
                            className="form-control"
                          />
                        </div>
                      </Col>
                      <Col sm="6">
                        {periodType == "Project" ? <div className="mb-3">
                          <Label htmlFor="price">Created At</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={moment(projectDate).format("DD-MM-YYYY")}
                            readOnly
                            className="form-control"
                          />
                        </div> : <div className="mb-3">
                          <Label htmlFor="price">Created At</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={periodType === "Milestone" ? mileStoneId ? mileStoneUpdate : "" : sprintsId ? sprintUpdate : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        }
                        <div className="mb-3">
                          <Label htmlFor="price">Mitigation Plan</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={periodType == "Project" ? projectMitigationPlan : periodType == "Milestone" ? mileStoneMitigationPlan : periodType == "Sprint" ? sprintMitigationPlan : ""}
                            onChange={
                              (e) => {
                                if (periodType == "Project") { setProjectMitigationPlan(e.target.value) }
                                if (periodType == "Milestone") { setMileStoneMitigationPlan(e.target.value) }
                                if (periodType == "Sprint") { setSprintMitigationPlan(e.target.value) }
                              }
                            }
                            className="form-control"
                          />
                          <p className="text-danger"> {periodType == "Project" ? riskError.mitigation_plan :
                            periodType == "Milestone" ? riskMileStoneError.mitigation_plan
                              : periodType === "Sprint" ? riskSprintError.mitigation_plan : ""}   </p>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Add Risk Register
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card className="comment-card">
            <CardBody>
              <h5 className="font-size-15">
                <i className="bx bx-message-dots text-muted align-middle me-1"></i>{" "}
                Comments on {periodType} :
              </h5>
              <div className="mt-5">
                {periodType == "Project" ? (
                  CommentFilterData.length > 0 ? (CommentFilterData?.map((ele) => {
                    return (
                      <>
                        <div key={ele.id} className="bg-white my-3 p-3 shadow-sm">
                          <div className="d-flex">
                            <div className="avatar-xs me-3">
                              <div className="avatar-title rounded-circle bg-light text-primary">
                                <i className="bx bxs-user"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="font-size-14 mb-1">
                                {ele.title}
                              </h5>
                              <p className="comment-desc text-muted mb-2">
                                {ele.description ? (parse(ele.description)) : ""}
                              </p>
                              <div className="d-flex justify-content-between align-items-end">
                              <div className="d-flex flex-column align-items-start">
                                <div className="d-flex mb-1">
                                <div className=" me-2">
                                  <span className="like-button" onClick={(e) => likeButton(ele.id)}>
                                  <AiFillLike />
                                  </span>
                                </div>
                                <div className="" >
                                <span className="like-button" onClick={(e) => DislikeButton(ele.id)}>
                                  <AiOutlineDislike />
                                  </span>
                                  {/* <img src={dislikeButton} style={{ width: "25px", height: "25px", cursor: "pointer", marginTop: "6px" }} alt="like button" onClick={(e) => DislikeButton(ele.id)} /> */}
                                </div>
                                </div>
                              <div className="mx-auto">{CommentFilterData?.map((ele1) => {
                                if (ele1.id == ele.id) {
                                  const result = ele.comment_likes.reduce((total, currentValue) => total = total + currentValue.is_like, 0);
                                  return (
                                    <>
                                      {result} Like
                                    </>)
                                }
                              })}</div>
                              </div>
                                <small className="text-muted float-end">
                                  Created At &nbsp;{moment(ele.updated_at).format("Do MMMM YYYY")}

                                  {/* {ele.user_id == storage.user_id ?
                                    <Link to="/edit-comment"
                                      className="text-success ms-2"
                                    >
                                      <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                      <UncontrolledTooltip placement="top" target="edittooltip">
                                        Edit
                                      </UncontrolledTooltip>
                                    </Link> : ""} */}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                  )) : "No Comment yet ") : periodType === "Milestone" ? CommentMileStoneData.length > 0 ? CommentMileStoneData?.map((ele) => {
                    return (
                      <>
                        <div key={ele.id} className="bg-white my-3 p-3 shadow-sm">
                          <div className="d-flex">
                            <div className="avatar-xs me-3">
                              <div className="avatar-title rounded-circle bg-light text-primary">
                                <i className="bx bxs-user"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="font-size-14 mb-1">
                                {ele.title}
                              </h5>
                              <p className="comment-desc text-muted mb-2">
                                {ele.description ? (parse(ele.description)) : ""}
                              </p>
                              <div className="d-flex justify-content-between align-items-end">
                              <div className="d-flex flex-column align-items-start">
                                <div className="d-flex mb-1">
                                <div className=" me-2">
                                  <span className="like-button" onClick={(e) => likeButton(ele.id)}>
                                  <AiFillLike />
                                  </span>
                                </div>
                                <div className="" >
                                <span className="like-button" onClick={(e) => DislikeButton(ele.id)}>
                                  <AiOutlineDislike />
                                  </span>
                                  {/* <img src={dislikeButton} style={{ width: "25px", height: "25px", cursor: "pointer", marginTop: "6px" }} alt="like button" onClick={(e) => DislikeButton(ele.id)} /> */}
                                </div>
                                </div>
                              <div className="mx-auto">{CommentMileStoneData?.map((ele1) => {
                                if (ele1.id == ele.id) {
                                  const result = ele.comment_likes.reduce((total, currentValue) => total = total + currentValue.is_like, 0);
                                  return (
                                    <>
                                      {result} Like
                                    </>)
                                }
                              })}</div>
                              </div>
                                <small className="text-muted float-end">
                                  Created At &nbsp;{moment(ele.updated_at).format("Do MMMM YYYY")}

                                  {/* {ele.user_id == storage.user_id ?
                                    <Link to="/edit-comment"
                                      className="text-success ms-2"
                                    >
                                      <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                      <UncontrolledTooltip placement="top" target="edittooltip">
                                        Edit
                                      </UncontrolledTooltip>
                                    </Link> : ""} */}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                  ) : "No Comment Yet" : CommentSprintData.length > 0 ? (CommentSprintData?.map((ele) => {
                    return (
                      <>
                        <div key={ele.id} className="bg-white my-3 p-3 shadow-sm">
                          <div className="d-flex">
                            <div className="avatar-xs me-3">
                              <div className="avatar-title rounded-circle bg-light text-primary">
                                <i className="bx bxs-user"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="font-size-14 mb-1">
                                {ele.title}
                              </h5>
                              <p className="comment-desc text-muted mb-2">
                                {ele.description ? (parse(ele.description)) : ""}
                              </p>
                              <div className="d-flex justify-content-between align-items-end">
                              <div className="d-flex flex-column align-items-start">
                                <div className="d-flex mb-1">
                                <div className=" me-2">
                                  <span className="like-button" onClick={(e) => likeButton(ele.id)}>
                                  <AiFillLike />
                                  </span>
                                </div>
                                <div className="" >
                                <span className="like-button" onClick={(e) => DislikeButton(ele.id)}>
                                  <AiOutlineDislike />
                                  </span>
                                  {/* <img src={dislikeButton} style={{ width: "25px", height: "25px", cursor: "pointer", marginTop: "6px" }} alt="like button" onClick={(e) => DislikeButton(ele.id)} /> */}
                                </div>
                                </div>
                              <div className="mx-auto">{CommentSprintData?.map((ele1) => {
                                if (ele1.id == ele.id) {
                                  const result = ele.comment_likes.reduce((total, currentValue) => total = total + currentValue.is_like, 0);
                                  return (
                                    <>
                                      {result} Like
                                    </>)
                                }
                              })}</div>
                              </div>
                                <small className="text-muted float-end">
                                  Created At &nbsp;{moment(ele.updated_at).format("Do MMMM YYYY")}

                                  {/* {ele.user_id == storage.user_id ?
                                    <Link to="/edit-comment"
                                      className="text-success ms-2"
                                    >
                                      <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                      <UncontrolledTooltip placement="top" target="edittooltip">
                                        Edit
                                      </UncontrolledTooltip>
                                    </Link> : ""} */}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                  )) : "No Comment Yet "}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h4>Add Comment</h4>
              <Row>
                <Col sm="6">
                  {periodType === "Project" ? (<div className="mb-3">
                    <Label htmlFor="price">Project Name</Label>
                    <Input
                      id="price"
                      name="sprints"
                      type="text"
                      value={projectId}
                      readOnly
                      className="form-control"
                    />
                  </div>) :
                    periodType == "Milestone" ?
                      <div>
                        <Label htmlFor="price">{periodType} Name</Label>
                        <Select
                          classNamePrefix="select2-selection"
                          placeholder="Choose..."
                          title="Country"
                          options={optionProject}
                          value={optionsCommentMileStone}
                          onChange={handleProjectComment}
                        />
                        <p className="text-danger">{commentRiskMileStoneError.milestone_id}</p>
                      </div> : periodType == "Sprint" ? <div>
                        <Label htmlFor="price">{periodType} Name</Label>
                        <Select
                          classNamePrefix="select2-selection"
                          placeholder="Choose..."
                          title="Country"
                          options={optionProject}
                          value={optionsCommentSprint}
                          onChange={handleProjectComment}
                        />
                        <p className="text-danger">{commentRiskSprintError.sprint_id}</p>
                      </div> : ""}
                </Col>
                <Col sm="6">
                  {periodType === "Project" ? (<div className="mb-3">
                    <Label htmlFor="price">Created At</Label>
                    <Input
                      id="price"
                      name="sprints"
                      type="text"
                      value={moment(projectDate).format("DD-MM-YYYY")}
                      readOnly
                      className="form-control"
                    />
                  </div>) : <div className="mb-3">
                    <Label htmlFor="price">Created At</Label>
                    <Input
                      id="price"
                      name="sprints"
                      type="text"
                      value={periodType === "Milestone" ? commentMileStoneId ? commentMileStoneUpdate : "" : commentSprintsId ? commentSprintUpdate : ""}
                      readOnly
                      className="form-control"
                    />
                  </div>}
                </Col></Row>
              <div>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  config={{ placeholder: "Enter Your Description..." }}
                  onReady={(editor) => {

                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCommentData(data)
                  }}
                  onBlur={(event, editor) => {
                  }}
                  onFocus={(event, editor) => {
                  }}
                />
                <p className="text-danger"> {periodType == "Project" ? commentRiskError.description :
                  periodType == "Milestone" ? commentRiskMileStoneError.description
                    : periodType === "Sprint" ? commentRiskSprintError.description : ""}   </p>
              </div>
              <Button type="submit" color="primary" onClick={() => CommentPost()}> Add comment</Button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment >
  )
}

export default RiskRegister
