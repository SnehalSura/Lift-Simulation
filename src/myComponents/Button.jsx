
function Button({Id, matter, myClass = ''}) {
  return (
    <p>
      <button id={Id} className={`buttonStyle ${myClass}`}>
        {matter}
      </button>
    </p>
  )
}

export default Button