import SpinWheel from '../Components/spinWheel'
import axios from 'axios'
import { useContext, useState } from 'react';
import { MainContext } from './Main';
import Web3 from 'web3'
function Home() {


    function connectToWallet() {
        const provider = window.ethereum;

        if (provider) {
            setWeb3(new Web3(provider));
            window.ethereum.enable();
        }
    }

    const { contract, userAccount, setWeb3 } = useContext(MainContext)

    const [aiImg, setAiImg] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true)
    const [showImage, setShowImage] = useState(false)
    const [Minting, setMinting] = useState(false)




    const [file, setFile] = useState(null);


    // Fetching Image
    const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
            {
                headers: { Authorization: HUGGING_FACE_API_KEY },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    async function getImage(e) {
        e.preventDefault();
        const title = e.target[0].value.toUpperCase();
        const description = e.target[1].value;
        setTitle(title);
        setShowImage(true)
        setLoading(true)
        query({ "inputs": description }).then((response) => {
            setFile(response)
            setAiImg(URL.createObjectURL(response));
            setLoading(false)
        });
    }








    async function mint(e) {
        e.preventDefault();
        try {
            setMinting(true)
            const formData = new FormData();
            formData.append("file", file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: 'e4f205e7074a6204c7e1',
                    pinata_secret_api_key: '0748f83a2719dce3928fc846a290b712d30686f745b29adb6dc9a39833cd0824',
                    "Content-Type": "multipart/form-data",
                },
            });
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;


            console.log(await contract.methods.uploadNFT(userAccount, title, ImgHash).send({
                from: userAccount
            }))
            setMinting(false)

        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>
            <div className='container'>
                {showImage ?

                    <div id='imgBox'>
                        {loading ?
                            <SpinWheel />
                            :
                            <img src={aiImg} alt="" />
                        }
                    </div>
                    :
                    ""
                }
                <form onSubmit={getImage}>
                    <h1>NFT GENERATOR</h1>
                    <input name='titleInput' minLength={5} maxLength={20} required type="text" placeholder='Give you NFT a Title....' />
                    <input name='descriptionInput' type="text" placeholder='Write description about the NFT you want to generate.' />
                    <button type='submit'>CREATE</button>
                    {showImage ?
                        (userAccount ?
                            <button type='button' onClick={mint}>
                                {Minting ? 'Minting...'
                                    :
                                    "Mint"}</button>
                            :
                            <button type='button' onClick={connectToWallet}>Connect to wallet</button>
                        )
                        :
                        ""
                    }
                </form>
            </div>
        </>
    )
}

export default Home;