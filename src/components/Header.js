import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {

    const onClick = (e) => {
        console.log('clicked');
    }
    return (
        <header className="header">
            <h1>{ title }</h1>
            <Button color="green" text="Hello" onClick={onClick}/ >
        </header>
    )
}

// css in js
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
