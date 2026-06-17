
import version from '../version.json';
export default function Footer() {
    return (
        <footer>
            <p>Build version: {version.version}</p>
        </footer>
    );
}
