
interface PostPageProps {
    params: { id: string };
}
const Town: React.FC<PostPageProps> = ({ params }) => {

    const id = params.id

    return (
        <div style={{ color: 'white' }}>esto es un post {id}</div>
    )
}


export default Town 
