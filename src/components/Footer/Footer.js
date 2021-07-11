import './Footer.css';

export function Footer() {
    return (
        <div className="footer-container">
            <p>Developed By Achal Saharan</p>
            <p>
                <a href="https://www.github.com/achalsaharan" target="_blank">
                    <i class="fab fa-github fa-lg"></i>
                </a>
                <a
                    href="https://www.linkedin.com/in/achalsaharan/"
                    target="_blank"
                >
                    <i class="fab fa-linkedin fa-lg"></i>
                </a>
            </p>
        </div>
    );
}
