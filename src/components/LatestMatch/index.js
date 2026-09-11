import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props

  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatch

  return (
    <div className="latest-match-card">
      <div>
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>

      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="latest-match-logo"
      />

      <div>
        <p>First Innings</p>
        <p>{firstInnings}</p>

        <p>Second Innings</p>
        <p>{secondInnings}</p>

        <p>Man Of The Match</p>
        <p>{manOfTheMatch}</p>

        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch