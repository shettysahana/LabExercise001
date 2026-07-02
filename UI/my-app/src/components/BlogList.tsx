import { Link } from 'react-router-dom'
const posts = [
    {
        id:'1', title: 'Understanding'
    },
    {
        id:'2', title: 'Does it Matter'
    },
    {
        id:'3', title: 'Managing State'
    }
]

export default function BlogList(){
    return(
<div> Blog Posts
    <ul>
    {posts.map((p) => (
        <li key={p.id}>
            <Link to={'/blogs/${p.id}'}> {p.title} </Link>
        </li>
    ))
}
</ul>
</div>
    );
}
