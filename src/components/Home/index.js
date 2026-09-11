import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedTeams = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({
      teams: updatedTeams,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeams = () => {
    const {teams} = this.state

    return (
      <ul className="teams-list">
        {teams.map(each => (
          <TeamCard key={each.id} team={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-bg">
        <div className="home-container">
          <div className="ipl-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-title">IPL Dashboard</h1>
          </div>

          {isLoading ? this.renderLoader() : this.renderTeams()}
        </div>
      </div>
    )
  }
}

export default Home