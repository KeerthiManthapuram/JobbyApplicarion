import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCardItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="rating-container">
                <FaStar className="rating-icon" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-heading">{location}</p>
              </div>

              <div className="employee-type-container">
                <BsBriefcaseFill className="brief-case-icon" />
                <p className="employee-type-heading">{employmentType}</p>
              </div>
            </div>

            <p className="package-heading">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />

        <h1 className="description-heading">Description</h1>

        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCardItem
