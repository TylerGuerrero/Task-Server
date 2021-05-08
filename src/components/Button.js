import React from 'react'
import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return (
        <button className="btn" 
        style={{background: color}}
        onClick={onClick}>
            { text }
        </button>
    )
}

Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button
