import {BiSearch} from 'react-icons/bi'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />

        <button
          type="button"
          id="searchButton"
          className="search-button-container"
          onClick={getJobs}
          aria-label="click"
        >
          <BiSearch className="search-icon" />
        </button>
      </div>
    )
  }
  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(eachItem => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="employee-item"
                key={eachItem.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  className="check-input"
                  value={eachItem.employmentTypeId}
                />
                <label
                  className="check-label"
                  htmlFor={eachItem.employmentTypeId}
                >
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Ranges</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachItem => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachItem.salaryRangeId)
            }
            return (
              <li
                className="salary-item"
                key={eachItem.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  name="salary"
                  className="check-input"
                  id={eachItem.salaryRangeId}
                />
                <label htmlFor={eachItem.salaryRangeId} className="check-label">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
