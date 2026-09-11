import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    bannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latest = data.latest_match_details

    const updatedLatestMatch = {
      umpires: latest.umpires,
      result: latest.result,
      manOfTheMatch: latest.man_of_the_match,
      id: latest.id,
      date: latest.date,
      venue: latest.venue,
      competingTeam: latest.competing_team,
      competingTeamLogo: latest.competing_team_logo,
      firstInnings: latest.first_innings,
      secondInnings: latest.second_innings,
      matchStatus: latest.match_status,
    }

    const updatedRecentMatches = data.recent_matches.map(each => ({
      id: each.id,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      result: each.result,
      matchStatus: each.match_status,
    }))

    this.setState({
      bannerUrl: data.team_banner_url,
      latestMatch: updatedLatestMatch,
      recentMatches: updatedRecentMatches,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderMatches = () => {
    const {bannerUrl, latestMatch, recentMatches} = this.state

    return (
      <div className="team-matches-container">
        <img src={bannerUrl} alt="team banner" className="team-banner" />

        <h1 className="latest-match-heading">Latest Matches</h1>

        <LatestMatch latestMatch={latestMatch} />

        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard key={each.id} matchDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="team-matches-bg">
        {isLoading ? this.renderLoader() : this.renderMatches()}
      </div>
    )
  }
}

export default TeamMatches