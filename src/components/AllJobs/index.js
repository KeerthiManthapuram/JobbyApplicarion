import {Component} from 'react'

import Cookies from 'js-cookie'

import {IoSearch} from 'react-icons/io5'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCardItem from '../JobCardItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    checkboxInputs: [],
    radioInput: '',
    searchInput: '',
    jobsApiStatus: jobsApiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileData = data.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileData: updatedProfileData,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsData = async () => {
    this.setState({
      jobsApiStatus: jobsApiStatusConstants.inProgress,
    })
    const {checkboxInputs, radioInput, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsApiStatus: jobsApiStatusConstants.success,
        jobsList: updatedJobsData,
      })
    } else {
      this.setState({
        jobsApiStatus: jobsApiStatusConstants.failure,
      })
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData[0]
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  onRetryProfile = () => {
    this.getProfileData()
  }

  renderProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        type="button"
        className="failure-button"
        onClick={this.onRetryProfile}
      >
        retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = profileApiStatus => {
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickingRetry = () => {
    this.getJobsData()
  }

  renderJobsFailureView = () => (
    <div className="failure-img-button-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickingRetry}
      >
        retry
      </button>
    </div>
  )

  renderJobCardItems = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="ul-job-items-container">
        {jobsList.map(each => (
          <JobCardItem key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  renderJobsView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConstants.success:
        return this.renderJobCardItems()
      case jobsApiStatusConstants.failure:
        return this.renderJobsFailureView()
      case jobsApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      each => each === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        each => each !== event.target.id,
      )
      this.setState({checkboxInputs: filteredData}, this.getJobsData)
    }
  }

  onGetCheckboxesView = () => (
    <ul className="check-boxes-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="input"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonsView = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            name="option"
            id={eachItem.salaryRangeId}
            onChange={this.onGetRadioOption}
          />
          <label htmlFor={eachItem.salaryRangeId} className="label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onSubmitSearchInput = () => {
    this.getJobsData()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="side-bar-container">
            {this.renderProfileView()}
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.onGetCheckboxesView()}
            <hr className="hr-line" />
            <h1 className="text">Salary Range</h1>
            {this.onGetRadioButtonsView()}
          </div>

          <div className="jobs-container">
            <div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="search-input"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSubmitSearchInput}
                aria-label="click"
              >
                <IoSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
