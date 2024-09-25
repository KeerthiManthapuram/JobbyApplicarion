import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getProfileData()
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
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileData,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-error-view-container">
      <button
        type="button"
        id="button"
        className="profile-failure-button"
        onClick={this.getProfileData}
      >
        retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileApiStatus} = this.state

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
}

export default ProfileDetails
