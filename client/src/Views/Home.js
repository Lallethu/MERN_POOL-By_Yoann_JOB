const Home = () => {
    if (!sessionStorage.getItem('status')) {
        sessionStorage.setItem('status', 'guest')
    }
    return (
        <div>
            <h1>Home page</h1>
        </div>
    );
}

export default Home;