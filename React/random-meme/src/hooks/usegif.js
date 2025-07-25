

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;


const useGif = () => {
    // Your custom hook logic here
    const [tag, setTag] = useState('Car');
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState('false');


    async function fetchData() {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

        const { data } = await axios.get(url);
        const imageSource = data.data.images.downsized_large.url;
        setGif(imageSource);
        setLoading(false);

    }

    useEffect(() => {
        fetchData();
    }, []);



};

export default useGif;