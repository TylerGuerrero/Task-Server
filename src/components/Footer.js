import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright &copy; 2021</p>
            <Link to="/about">Go to about</Link>
        </footer>
    )
}

export default Footer
